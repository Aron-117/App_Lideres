import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  async create(
    createArchivoMaterialDto: CreateArchivoMaterialDto,
    fileData: {
      nombre_archivo: string;
      url: string;
      public_id: string;
      resource_type: string;
    },
  ) {
    if (!fileData) {
      throw new BadRequestException('Archivo requerido');
    }
    const material = await this.materialRepository.findOneBy({
      id_material: createArchivoMaterialDto.id_material,
    });
    if (!material) {
      throw new NotFoundException('Material no encontrado');
    }
    const archivoMaterial = this.archivoMaterialRepository.create({
      nombre_archivo: fileData.nombre_archivo,
      url: fileData.url,
      public_id: fileData.public_id,
      material: material,
      resource_type: fileData.resource_type,
    });
    return await this.archivoMaterialRepository.save(archivoMaterial);
  }

  async findAll() {
    return await this.archivoMaterialRepository.find();
  }
  async findByMaterial(idMaterial: number) {
    return this.archivoMaterialRepository.find({
      where: { material: { id_material: idMaterial } },
    });
  }
  async findOne(id: number) {
    const archivo = await this.archivoMaterialRepository.findOneBy({
      id_archivo: id,
    });
    if (!archivo) throw new NotFoundException('Archivo no econtrado');
    return archivo;
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
      updateArchivoMaterialDto as any,
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
