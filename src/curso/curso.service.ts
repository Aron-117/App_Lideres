import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Inscripcion } from 'src/inscripcion/entities/inscripcion.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,
  ) {}
  async create(createCursoDto: CreateCursoDto) {
    const profesor = await this.usuarioRepository.findOneBy({
      id_usuario: createCursoDto.id_profesor,
    });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }
    const hoy = new Date();
    const fechaFin = new Date(createCursoDto.fecha_fin);
    const fechaIni = new Date(createCursoDto.fecha_inicio);
    if (fechaFin < fechaIni || fechaFin < hoy) {
      throw new ConflictException('Fecha fin en conflicto');
    }
    const curso = this.cursoRepository.create({
      ...createCursoDto,
      profesor: { id_usuario: createCursoDto.id_profesor },
    });
    return await this.cursoRepository.save(curso);
  }
  async getEstudiantes(idCurso: number) {
    const inscripciones = await this.inscripcionRepository.find({
      where: { curso: { id_curso: idCurso } },
      relations: { usuario: true },
    });
    return inscripciones;
  }
  async findAll() {
    return await this.cursoRepository.find({ relations: { profesor: true } });
  }

  async findOne(id: number) {
    return await this.cursoRepository.findOne({
      where: { id_curso: id },
      relations: { profesor: true },
    });
  }

  async findMyCursos(userId: number) {
    return await this.cursoRepository.find({
      where: {
        profesor: {
          id_usuario: userId,
        },
      },
    });
  }
  async findRecursos(id: number) {
    const curso = await this.cursoRepository.findOne({
      where: { id_curso: id },
      relations: { tareas: true },
    });
    const tareasConTipo = (curso?.tareas || []).map((tarea) => ({
      ...tarea,
      fecha: tarea.fecha_publicacion,
      tipo: 'tarea',
    }));
    const cursoM = await this.cursoRepository.findOne({
      where: { id_curso: id },
      relations: { materiales: true },
    });
    const materialesConTipo = (cursoM?.materiales || []).map((material) => ({
      ...material,
      fecha: material.fecha_subida,
      tipo: 'material',
    }));
    const recursos = [...tareasConTipo, ...materialesConTipo];
    recursos.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
    const repuesta = {
      curso: await this.cursoRepository.findOneBy({ id_curso: id }),
      recursos,
    };
    return repuesta;
  }
  async update(id: number, updateCursoDto: UpdateCursoDto) {
    const curso = await this.cursoRepository.findOne({
      where: { id_curso: id },
      relations: { profesor: true },
    });
    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }
    if (updateCursoDto.id_profesor) {
      curso.profesor.id_usuario = updateCursoDto.id_profesor;
    }
    this.cursoRepository.merge(curso, updateCursoDto);
    return await this.cursoRepository.save(curso);
  }

  async remove(id: number) {
    const curso = await this.cursoRepository.findOneBy({ id_curso: id });
    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }
    return await this.cursoRepository.softRemove(curso);
  }
  async getEstadisticasCupos() {
    const estadisticasRaw = await this.cursoRepository
      .createQueryBuilder('curso')
      .leftJoin('curso.inscripciones', 'inscripcion')
      .select(['curso.id_curso', 'curso.nombre', 'curso.cupos'])
      .addSelect('COUNT(inscripcion.id_inscripcion)', 'cupos_ocupados')
      .groupBy('curso.id_curso')
      .getRawMany();
    return estadisticasRaw.map((curso) => {
      const totales = Number(curso.curso_cupos);
      const ocupados = Number(curso.cupos_ocupados);
      return {
        id_curso: curso.curso_id_curso,
        nombre: curso.curso_nombre,
        cupos_totales: totales,
        cupos_ocupados: ocupados,
        cupos_libres: totales - ocupados,
      };
    });
  }
  async getReporteNotas(id_curso: number) {
    const curso = await this.cursoRepository.findOne({
      where: { id_curso },
      relations: {
        inscripciones: {
          usuario: true,
        },
        tareas: {
          entregas: {
            usuario: true,
          },
        },
      },
    });
    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }
    const reporte = curso.inscripciones.map((inscripcion) => {
      const estudiante = inscripcion.usuario;
      const filaReporte: any = {
        Estudiante: estudiante.nombre,
      };

      let sumaNotas = 0;
      let cantidadTareas = 0;

      // 3. Revisamos cada tarea del curso para ver si el estudiante la entregó
      curso.tareas.forEach((tarea) => {
        // Buscamos la entrega de este estudiante en esta tarea en específico
        const entrega = tarea.entregas.find(
          (e) => e.usuario.id_usuario === estudiante.id_usuario,
        );
        const nota = entrega?.calificacion ?? 0;
        filaReporte[tarea.titulo] = nota;

        sumaNotas += nota;
        cantidadTareas++;
      });
      filaReporte['Promedio'] =
        cantidadTareas > 0
          ? Number((sumaNotas / cantidadTareas).toFixed(2))
          : 0;

      return filaReporte;
    });
    return reporte.sort((a, b) => a.Estudiante.localeCompare(b.Estudiante));
  }
}
