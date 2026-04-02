import { Module } from '@nestjs/common';
import { ArchivoEntregaService } from './archivo_entrega.service';
import { ArchivoEntregaController } from './archivo_entrega.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivoEntrega } from './entities/archivo_entrega.entity';
import { Entrega } from 'src/entrega/entities/entrega.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArchivoEntrega, Entrega])],
  controllers: [ArchivoEntregaController],
  providers: [ArchivoEntregaService],
})
export class ArchivoEntregaModule {}
