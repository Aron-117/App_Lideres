import { Module } from '@nestjs/common';
import { ArchivoEntregaService } from './archivo_entrega.service';
import { ArchivoEntregaController } from './archivo_entrega.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivoEntrega } from './entities/archivo_entrega.entity';
import { Entrega } from 'src/entrega/entities/entrega.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArchivoEntrega, Entrega]), FilesModule],
  controllers: [ArchivoEntregaController],
  providers: [ArchivoEntregaService],
  exports: [ArchivoEntregaService],
})
export class ArchivoEntregaModule {}
