import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class InscripcionService {
  constructor(
    @InjectRepository(Inscripcion)
    private inscripcionRepository: Repository<Inscripcion>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}
  async create(createInscripcionDto: CreateInscripcionDto) {
    const usuario = await this.usuarioRepository.findOneBy({
      id_usuario: createInscripcionDto.id_usuario,
    });
    const curso = await this.cursoRepository.findOneBy({
      id_curso: createInscripcionDto.id_curso,
    });
    if (!usuario)
      throw new NotFoundException(
        `Usuario con id ${createInscripcionDto.id_usuario} no encontrado`,
      );
    if (!curso)
      throw new NotFoundException(
        `Curso con id ${createInscripcionDto.id_curso} no encontrado`,
      );
    const inscripcion = this.inscripcionRepository.create(createInscripcionDto);
    return await this.inscripcionRepository.save(inscripcion);
  }

  async findAll() {
    return await this.inscripcionRepository.find();
  }

  async findOne(id: number) {
    return await this.inscripcionRepository.findOneBy({ id_inscripcion: id });
  }

  async update(id: number, updateInscripcionDto: UpdateInscripcionDto) {
    const inscripcion = await this.inscripcionRepository.findOneBy({
      id_inscripcion: id,
    });
    if (!inscripcion)
      throw new NotFoundException(`Inscripcion con id ${id} no encontrada`);
    await this.inscripcionRepository.update(id, updateInscripcionDto);
    return await this.inscripcionRepository.findOneBy({ id_inscripcion: id });
  }

  async remove(id: number) {
    const inscripcion = await this.inscripcionRepository.findOneBy({
      id_inscripcion: id,
    });
    if (!inscripcion)
      throw new NotFoundException(`Inscripcion con id ${id} no encontrada`);
    return await this.inscripcionRepository.remove(inscripcion);
  }
}
