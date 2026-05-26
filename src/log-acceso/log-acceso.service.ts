import { Inject, Injectable } from '@nestjs/common';
import { CreateLogAccesoDto } from './dto/create-log-acceso.dto';
import { UpdateLogAccesoDto } from './dto/update-log-acceso.dto';
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
  async findAll() {
    return await this.LogAccesoRepository.find();
  }
}
