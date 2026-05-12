import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}
  async create(createMaterialDto: CreateMaterialDto) {
    const curso = await this.cursoRepository.findOneBy({
      id_curso: createMaterialDto.id_curso,
    });
    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }
    const material = this.materialRepository.create(createMaterialDto);
    return await this.materialRepository.save(material);
  }

  async findAll() {
    return await this.materialRepository.find();
  }
  async findOne(id: number) {
    return await this.materialRepository.findOne({
      where: { id_material: id },
      relations: ['archivos'],
    });
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    const material = await this.materialRepository.findOneBy({
      id_material: id,
    });
    if (!material) {
      throw new NotFoundException('Material no encontrado');
    }
    const updatedMaterial = this.materialRepository.merge(
      material,
      updateMaterialDto,
    );
    return await this.materialRepository.save(updatedMaterial);
  }

  async remove(id: number) {
    const material = await this.materialRepository.findOneBy({
      id_material: id,
    });
    if (!material) {
      throw new NotFoundException('Material no encontrado');
    }
    return await this.materialRepository.remove(material);
  }
}
