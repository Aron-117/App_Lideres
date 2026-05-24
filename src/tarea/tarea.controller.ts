import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { RolesGuard } from 'src/auth/decorators/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('tarea')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Post()
  @Roles('Profesor')
  create(@Body() createTareaDto: CreateTareaDto, @Req() req) {
    return this.tareaService.create(createTareaDto, req.user?.sub);
  }

  @Get()
  @Roles('Admin')
  findAll() {
    return this.tareaService.findAll();
  }
  @Get('pendientes')
  findPendientes(@Req() req) {
    return this.tareaService.findPendientes(req.user?.sub);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tareaService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Admin', 'Profesor')
  update(@Param('id') id: string, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareaService.update(+id, updateTareaDto);
  }

  @Delete(':id')
  @Roles('Admin', 'Profesor')
  remove(@Param('id') id: string) {
    return this.tareaService.remove(+id);
  }
}
