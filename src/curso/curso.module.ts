import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { InscripcionModule } from 'src/inscripcion/inscripcion.module';
import { Inscripcion } from 'src/inscripcion/entities/inscripcion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso, Usuario, Inscripcion]),
    InscripcionModule,
    CursoModule,
  ],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}
