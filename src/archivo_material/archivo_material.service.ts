import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArchivoMaterialDto } from './dto/create-archivo_material.dto';
import { UpdateArchivoMaterialDto } from './dto/update-archivo_material.dto';
import { ArchivoMaterial } from './entities/archivo_material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from 'src/material/entities/material.entity';

@Injectable()
export class ArchivoMaterialService {
  constructor(
    @InjectRepository(ArchivoMaterial)
    private archivoMaterialRepository: Repository<ArchivoMaterial>,
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}
  async create(createArchivoMaterialDto: CreateArchivoMaterialDto) {
    const material = await this.materialRepository.findOneBy({
      id_material: createArchivoMaterialDto.id_material,
    });
    if (!material) {
      throw new NotFoundException('Material no encontrado');
    }
    const archivoMaterial = this.archivoMaterialRepository.create(
      createArchivoMaterialDto,
    );
    return await this.archivoMaterialRepository.save(archivoMaterial);
  }

  async findAll() {
    return await this.archivoMaterialRepository.find();
  }

  async findOne(id: number) {
    return await this.archivoMaterialRepository.findOneBy({ id_archivo: id });
  }

  async update(id: number, updateArchivoMaterialDto: UpdateArchivoMaterialDto) {
    const archivoMaterial = await this.archivoMaterialRepository.findOneBy({
      id_archivo: id,
    });
    if (!archivoMaterial) {
      throw new NotFoundException('Archivo de material no encontrado');
    }
    this.archivoMaterialRepository.merge(
      archivoMaterial,
      updateArchivoMaterialDto,
    );
    return await this.archivoMaterialRepository.save(archivoMaterial);
  }

  async remove(id: number) {
    const archivoMaterial = await this.archivoMaterialRepository.findOneBy({
      id_archivo: id,
    });
    if (!archivoMaterial) {
      throw new NotFoundException('Archivo de material no encontrado');
    }
    return await this.archivoMaterialRepository.remove(archivoMaterial);
  }
}
