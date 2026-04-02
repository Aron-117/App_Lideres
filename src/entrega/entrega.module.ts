import { Module } from '@nestjs/common';
import { EntregaService } from './entrega.service';
import { EntregaController } from './entrega.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrega } from './entities/entrega.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Tarea } from 'src/tarea/entities/tarea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entrega, Usuario, Tarea])],
  controllers: [EntregaController],
  providers: [EntregaService],
})
export class EntregaModule {}
