import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';
import { MaterialModule } from './material/material.module';
import { CursoModule } from './curso/curso.module';
import { TareaModule } from './tarea/tarea.module';
import { EntregaModule } from './entrega/entrega.module';
import { ArchivoTareaModule } from './archivo_tarea/archivo_tarea.module';
import { ArchivoMaterialModule } from './archivo_material/archivo_material.module';
import { ArchivoEntregaModule } from './archivo_entrega/archivo_entrega.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    UsuarioModule,
    InscripcionModule,
    MaterialModule,
    CursoModule,
    TareaModule,
    EntregaModule,
    ArchivoTareaModule,
    ArchivoMaterialModule,
    ArchivoEntregaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'escuela_lideres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
