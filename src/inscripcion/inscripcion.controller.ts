import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InscripcionService } from './inscripcion.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { RolesGuard } from 'src/auth/decorators/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('inscripcion')
export class InscripcionController {
  constructor(private readonly inscripcionService: InscripcionService) {}

  @Post()
  @Roles('Admin')
  create(@Body() createInscripcionDto: CreateInscripcionDto) {
    return this.inscripcionService.create(createInscripcionDto);
  }

  @Get()
  @Roles('Profesor', 'Admin')
  findAll() {
    return this.inscripcionService.findAll();
  }

  @Get(':id')
  @Roles('Profesor', 'Admin')
  findOne(@Param('id') id: string) {
    return this.inscripcionService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Admin')
  update(
    @Param('id') id: string,
    @Body() updateInscripcionDto: UpdateInscripcionDto,
  ) {
    return this.inscripcionService.update(+id, updateInscripcionDto);
  }
  @Delete('/estudiante/:idEst/curso/:idCur')
  @Roles('Admin')
  removeByStudentAndCourse(
    @Param('idEst') idEstudiante: string,
    @Param('idCur') idCurso,
  ) {
    return this.inscripcionService.removeBy(+idEstudiante, +idCurso);
  }
  @Delete(':id')
  @Roles('Admin')
  remove(@Param('id') id: string) {
    return this.inscripcionService.remove(+id);
  }
}
