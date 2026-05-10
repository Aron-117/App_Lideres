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
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      ssl: { rejectUnauthorized: false }, // necesario para Render
    }),
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
