import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { LogAccesoService } from './log-acceso.service';
import { CreateLogAccesoDto } from './dto/create-log-acceso.dto';
import { RolesGuard } from 'src/auth/decorators/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('log-acceso')
export class LogAccesoController {
  constructor(private readonly logAccesoService: LogAccesoService) {}

  @Post()
  create(@Body() createLogAccesoDto: CreateLogAccesoDto) {
    return this.logAccesoService.create(createLogAccesoDto);
  }

  @Roles('Admin')
  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '15',
  ) {
    return this.logAccesoService.findAll(Number(page), Number(limit));
  }
}
