import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArchivoTareaDto } from './dto/create-archivo_tarea.dto';
import { UpdateArchivoTareaDto } from './dto/update-archivo_tarea.dto';
import { ArchivoTarea } from './entities/archivo_tarea.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from 'src/tarea/entities/tarea.entity';

@Injectable()
export class ArchivoTareaService {
  constructor(
    @InjectRepository(ArchivoTarea)
    private readonly archivoTareaRepository: Repository<ArchivoTarea>,
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
  ) {}
  async create(createArchivoTareaDto: CreateArchivoTareaDto, file) {
    if (!file) {
      throw new BadRequestException('Archivo requerido');
    }
    const tarea = await this.tareaRepository.findOneBy({
      id_tarea: createArchivoTareaDto.id_tarea,
    });
    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }
    const archivoTarea = this.archivoTareaRepository.create({
      nombre_archivo: file.filename,
      tarea: tarea,
    });
    return await this.archivoTareaRepository.save(archivoTarea);
  }

  async findAll() {
    return await this.archivoTareaRepository.find();
  }

  async findOne(id: number) {
    return await this.archivoTareaRepository.findOneBy({ id_archivo: id });
  }

  async update(id: number, updateArchivoTareaDto: UpdateArchivoTareaDto) {
    const archivoTarea = await this.archivoTareaRepository.findOneBy({
      id_archivo: id,
    });
    if (!archivoTarea) {
      throw new NotFoundException('Archivo de tarea no encontrado');
    }
    Object.assign(archivoTarea, updateArchivoTareaDto);
    return await this.archivoTareaRepository.save(archivoTarea);
  }

  async remove(id: number) {
    const archivoTarea = await this.archivoTareaRepository.findOneBy({
      id_archivo: id,
    });
    if (!archivoTarea) {
      throw new NotFoundException('Archivo de tarea no encontrado');
    }
    return await this.archivoTareaRepository.remove(archivoTarea);
  }
}
