import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private tareaRepository: Repository<Tarea>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}
  async create(createTareaDto: CreateTareaDto) {
    const curso = await this.cursoRepository.findOneBy({
      id_curso: createTareaDto.id_curso,
    });
    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }
    const tarea = this.tareaRepository.create({
      curso: { id_curso: createTareaDto.id_curso },
      fecha_publicacion: new Date(),
      ...createTareaDto,
    });
    return await this.tareaRepository.save(tarea);
  }

  async findAll() {
    return await this.tareaRepository.find();
  }

  async findOne(id: number) {
    return await this.tareaRepository.findOne({
      where: { id_tarea: id },
      relations: ['archivos'],
    });
  }
  async findPendientes(id_usuario: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.tareaRepository
      .createQueryBuilder('tarea')
      .innerJoin('tarea.curso', 'curso')
      .innerJoin('curso.inscripciones', 'inscripcion')
      .leftJoin(
        'tarea.entregas',
        'entrega',
        'entrega.usuario.id_usuario = :id_usuario AND entrega.tarea.id_tarea = tarea.id_tarea',
        { id_usuario },
      )
      .where('inscripcion.id_usuario = :id_usuario', { id_usuario })
      .andWhere('entrega.id_entrega IS NULL')
      .orderBy('tarea.fecha_entrega', 'ASC')
      .getMany();
  }
  async update(id: number, updateTareaDto: UpdateTareaDto) {
    const tarea = await this.tareaRepository.findOneBy({ id_tarea: id });
    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return this.tareaRepository.merge(tarea, updateTareaDto);
  }

  async remove(id: number) {
    const tarea = await this.tareaRepository.findOneBy({ id_tarea: id });
    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return this.tareaRepository.remove(tarea);
  }
}
