import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entrega } from './entities/entrega.entity';
import { Repository } from 'typeorm';
import { Tarea } from 'src/tarea/entities/tarea.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ArchivoEntregaService } from 'src/archivo_entrega/archivo_entrega.service';

@Injectable()
export class EntregaService {
  constructor(
    @InjectRepository(Entrega)
    private readonly entregaRepository: Repository<Entrega>,
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly archivoService: ArchivoEntregaService,
  ) {}
  async create(createEntregaDto: CreateEntregaDto, id_usuario: number) {
    const tarea = await this.tareaRepository.findOneBy({
      id_tarea: createEntregaDto.id_tarea,
    });
    const usuario = await this.usuarioRepository.findOneBy({
      id_usuario: id_usuario,
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }
    const existente = await this.entregaRepository.findOne({
      where: {
        tarea: { id_tarea: createEntregaDto.id_tarea },
        usuario: { id_usuario: id_usuario },
      },
    });
    if (existente) return this.findOne(existente.id_entrega);
    const entrega = this.entregaRepository.create({
      ...(createEntregaDto as any),
      fecha_entrega: new Date(),
      tarea,
      usuario,
    });
    return this.entregaRepository.save(entrega);
  }

  async findAll() {
    return await this.entregaRepository.find();
  }

  async findOne(id: number) {
    return await this.entregaRepository.findOne({
      where: { id_entrega: id },
      relations: { archivos: true },
    });
  }
  async findByUsuario(options: { id_usuario: number }) {
    return await this.entregaRepository.find({
      where: { usuario: { id_usuario: options.id_usuario } },
    });
  }
  async findAllByTarea(idTarea: number) {
    return await this.entregaRepository.find({
      where: {
        tarea: { id_tarea: idTarea },
      },
      relations: { usuario: true, archivos: true },
      order: { fecha_entrega: 'DESC' },
    });
  }
  async findPersonalTarea(id_tarea: number, id_usuario: number) {
    const existente = await this.entregaRepository.findOne({
      where: {
        tarea: { id_tarea: id_tarea },
        usuario: { id_usuario: id_usuario },
      },
    });
    if (!existente) return { entrega: null, entregado: false };
    const entrega = await this.findOne(existente.id_entrega);
    return { entrega: entrega, entregado: true };
  }
  async update(id: number, updateEntregaDto: UpdateEntregaDto) {
    const entrega = await this.entregaRepository.findOne({
      where: { id_entrega: id },
      relations: { tarea: true },
    });
    if (!entrega) {
      throw new NotFoundException('Entrega no encontrada');
    }
    if (
      updateEntregaDto.calificacion &&
      updateEntregaDto.calificacion > entrega.tarea.calificacion
    ) {
      throw new ConflictException(
        `No es posible que la calificacion sea mayor a ${entrega.tarea.calificacion}`,
      );
    }
    this.entregaRepository.merge(entrega, updateEntregaDto as any);
    return await this.entregaRepository.save(entrega);
  }

  async remove(id: number) {
    const entrega = await this.entregaRepository.findOne({
      where: { id_entrega: id },
      relations: {
        archivos: true,
      },
    });
    if (!entrega) {
      throw new NotFoundException('Entrega no encontrada');
    }
    const archivos = entrega.archivos;
    for (const archivo of archivos) {
      await this.archivoService.remove(archivo.id_archivo);
    }
    return await this.entregaRepository.remove(entrega);
  }
}
