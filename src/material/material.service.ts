import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Curso } from 'src/curso/entities/curso.entity';
import { ArchivoMaterialService } from 'src/archivo_material/archivo_material.service';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    private archivoService: ArchivoMaterialService,
  ) {}
  async create(createMaterialDto: CreateMaterialDto, id_usuario: number) {
    const curso = await this.cursoRepository.findOne({
      where: { id_curso: createMaterialDto.id_curso },
      relations: {
        profesor: true,
      },
    });
    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }
    if (curso.profesor.id_usuario !== id_usuario) {
      throw new UnauthorizedException('Accion no autorizada');
    }
    const material = this.materialRepository.create({
      curso: { id_curso: createMaterialDto.id_curso },
      fecha_subida: new Date(),
      ...createMaterialDto,
    });
    return await this.materialRepository.save(material);
  }

  async findAll() {
    return await this.materialRepository.find();
  }
  async findOne(id: number) {
    return await this.materialRepository.findOne({
      where: { id_material: id },
      relations: {
        archivos: true,
      },
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
    const material = await this.materialRepository.findOne({
      where: { id_material: id },
      relations: {
        archivos: true,
      },
    });
    if (!material) {
      throw new NotFoundException('Material no encontrado');
    }
    const archivos = material.archivos;
    for (const archivo of archivos) {
      await this.archivoService.remove(archivo.id_archivo);
    }
    return await this.materialRepository.remove(material);
  }
}
