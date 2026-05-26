import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateArchivoEntregaDto } from './dto/create-archivo_entrega.dto';
import { UpdateArchivoEntregaDto } from './dto/update-archivo_entrega.dto';
import { Entrega } from 'src/entrega/entities/entrega.entity';
import { ArchivoEntrega } from './entities/archivo_entrega.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArchivoEntregaService {
  constructor(
    @InjectRepository(ArchivoEntrega)
    private readonly archivoEntregaRepository: Repository<ArchivoEntrega>,
    @InjectRepository(Entrega)
    private readonly entregaRepository: Repository<Entrega>,
  ) {}
  async create(
    createArchivoEntregaDto: CreateArchivoEntregaDto,
    fileData: {
      nombre_archivo: string;
      url: string;
      public_id: string;
    },
  ) {
    if (!fileData) {
      throw new BadRequestException('Archivo requerido');
    }
    const entrega = await this.entregaRepository.findOne({
      where: { id_entrega: createArchivoEntregaDto.id_entrega },
      relations: { tarea: true },
    });
    if (!entrega) {
      throw new NotFoundException('Entrega no encontrada');
    }
    const fechaLim = entrega.tarea.fecha_entrega;
    const fechaActual = new Date();
    if (fechaActual.getTime() > fechaLim.getTime()) {
      throw new UnauthorizedException('Ya vencio la fecha de entrega');
    }
    await this.entregaRepository.update(entrega.id_entrega, {
      fecha_entrega: fechaActual,
    });
    const archivoEntrega = this.archivoEntregaRepository.create({
      nombre_archivo: fileData.nombre_archivo,
      url: fileData.url,
      public_id: fileData.public_id,
      entrega: entrega,
    });
    return await this.archivoEntregaRepository.save(archivoEntrega);
  }

  async findAll() {
    return await this.archivoEntregaRepository.find();
  }

  async findOne(id: number) {
    const archivo = await this.archivoEntregaRepository.findOneBy({ id_archivo: id });
    if (!archivo) throw new NotFoundException('Archivo no econtrado');
    return archivo;
  }

  async update(id: number, updateArchivoEntregaDto: UpdateArchivoEntregaDto) {
    const archivoEntrega = await this.archivoEntregaRepository.findOneBy({
      id_archivo: id,
    });
    if (!archivoEntrega) {
      throw new NotFoundException('Archivo de entrega no encontrado');
    }
    this.archivoEntregaRepository.merge(archivoEntrega);
    return await this.archivoEntregaRepository.save(archivoEntrega);
  }

  async remove(id: number) {
    const archivoEntrega = await this.archivoEntregaRepository.findOneBy({
      id_archivo: id,
    });
    if (!archivoEntrega) {
      throw new NotFoundException('Archivo de entrega no encontrado');
    }
    return await this.archivoEntregaRepository.remove(archivoEntrega);
  }
}
