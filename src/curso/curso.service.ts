import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    @InjectRepository(Usuario)
    private readonly usuarioRespository: Repository<Usuario>,
  ) {}
  async create(createCursoDto: CreateCursoDto) {
    const profesor = await this.usuarioRespository.findOneBy({
      id_usuario: createCursoDto.id_profesor,
    });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }
    const curso = this.cursoRepository.create({
      ...createCursoDto,
      profesor: { id_usuario: createCursoDto.id_profesor },
    });
    return await this.cursoRepository.save(curso);
  }

  async findAll() {
    return await this.cursoRepository.find();
  }

  async findOne(id: number) {
    return await this.cursoRepository.findOneBy({ id_curso: id });
  }

  async findMyCursos(userId: number) {
    const usuario = await this.usuarioRespository.findOne({
      where: { id_usuario: userId },
      relations: ['cursos'],
    });
    return usuario?.cursos || [];
  }
  async findRecursos(id: number) {
    const tareas = await this.cursoRepository.findOne({
      where: { id_curso: id },
      relations: ['tareas', 'cursos'],
    });
    const materiales = await this.cursoRepository.findOne({
      where: { id_curso: id },
      relations: ['cursos'],
    });
    const repuesta = {
      curso: this.cursoRepository.findOneBy({ id_curso: id }),
      tareas: tareas?.tareas || [],
      materiales: materiales?.cursos || [],
    };
    return repuesta;
  }
  async update(id: number, updateCursoDto: UpdateCursoDto) {
    const curso = await this.cursoRepository.findOneBy({ id_curso: id });
    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }
    this.cursoRepository.merge(curso, updateCursoDto);
    return await this.cursoRepository.save(curso);
  }

  async remove(id: number) {
    const curso = await this.cursoRepository.findOneBy({ id_curso: id });
    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }
    return await this.cursoRepository.remove(curso);
  }
}
