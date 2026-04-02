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
    const usuario = await this.usuarioRepository.findOneBy({
      id_usuario: createTareaDto.id_usuario,
    });
    const curso = await this.cursoRepository.findOneBy({
      id_curso: createTareaDto.id_curso,
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }
    const tarea = this.tareaRepository.create(createTareaDto);
    return this.tareaRepository.save(tarea);
  }

  async findAll() {
    return this.tareaRepository.find();
  }

  async findOne(id: number) {
    return this.tareaRepository.findOneBy({ id_tarea: id });
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
