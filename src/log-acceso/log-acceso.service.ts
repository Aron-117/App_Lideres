import { Injectable } from '@nestjs/common';
import { CreateLogAccesoDto } from './dto/create-log-acceso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogAcceso } from './entities/log-acceso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogAccesoService {
  constructor(
    @InjectRepository(LogAcceso)
    private readonly LogAccesoRepository: Repository<LogAcceso>,
  ) {}
  async create(createLogAccesoDto: CreateLogAccesoDto) {
    const algo = this.LogAccesoRepository.create(createLogAccesoDto);
    return await this.LogAccesoRepository.save(algo);
  }
  async findAll(page: number = 1, limit: number = 15) {
    const skip = (page - 1) * limit;
    const [logs, total] = await this.LogAccesoRepository.findAndCount({
      order: { fecha: 'DESC' },
      take: limit,
      skip: skip,
    });
    return {
      data: logs,
      meta: {
        totalItems: total,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }
}
