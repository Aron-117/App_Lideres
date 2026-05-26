import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogAccesoService } from './log-acceso.service';
import { CreateLogAccesoDto } from './dto/create-log-acceso.dto';
import { UpdateLogAccesoDto } from './dto/update-log-acceso.dto';

@Controller('log-acceso')
export class LogAccesoController {
  constructor(private readonly logAccesoService: LogAccesoService) {}

  @Post()
  create(@Body() createLogAccesoDto: CreateLogAccesoDto) {
    return this.logAccesoService.create(createLogAccesoDto);
  }

  @Get()
  findAll() {
    return this.logAccesoService.findAll();
  }
}
