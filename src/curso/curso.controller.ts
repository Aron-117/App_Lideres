import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InscripcionService } from 'src/inscripcion/inscripcion.service';


@Controller('curso')
export class CursoController {
  constructor(
    private readonly cursoService: CursoService,
    private readonly inscripcionService: InscripcionService,
  ) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursoService.findAll();
  }

  @Get('my')
  findMyCursos(@Req() req) {
    const userId = req.user?.sub;
    if (!userId) {
      return [];
    }
    const rol = req.user?.rol;
    if (rol === 'Profesor') {
      return this.cursoService.findMyCursos(userId);
    }
    if (rol === 'Estudiante') {
      return this.inscripcionService.findCursosByEstudianteId(userId);
    }
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
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(+id, updateCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoService.remove(+id);
  }
}
