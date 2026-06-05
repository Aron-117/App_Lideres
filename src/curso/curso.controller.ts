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
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InscripcionService } from 'src/inscripcion/inscripcion.service';
import { RolesGuard } from 'src/auth/decorators/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('curso')
export class CursoController {
  constructor(
    private readonly cursoService: CursoService,
    private readonly inscripcionService: InscripcionService,
  ) {}

  @Post()
  @Roles('Admin')
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @Get()
  @Roles('Admin')
  findAll() {
    return this.cursoService.findAll();
  }
  @Get('my')
  findMyCursos(@Req() req) {
    const userId = req.user?.sub;
    if (!userId) {
      return [];
    }
    const rol: string = req.user?.rol;
    if (rol === 'Profesor') {
      return this.cursoService.findMyCursos(userId);
    }
    if (rol === 'Estudiante') {
      return this.inscripcionService.findCursosByEstudianteId(userId);
    }
  }

  @Get('estadisticas')
  @Roles('Admin')
  async getEstadisticas() {
    return await this.cursoService.getEstadisticasCupos();
  }
  @Get(':idCurso/inscripciones')
  findEstudiantes(@Param('idCurso') idCurso: string) {
    return this.cursoService.getEstudiantes(+idCurso);
  }
  @Get(':id/reporte-notas')
  @Roles('Admin', 'Profesor')
  async getReporteNotas(@Param('id') id: string) {
    return await this.cursoService.getReporteNotas(+id);
  }
  @Get(':id/recursos')
  findRecursos(@Param('id') id: string) {
    return this.cursoService.findRecursos(+id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Admin')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(+id, updateCursoDto);
  }

  @Delete(':id')
  @Roles('Admin')
  remove(@Param('id') id: string) {
    return this.cursoService.remove(+id);
  }
}
