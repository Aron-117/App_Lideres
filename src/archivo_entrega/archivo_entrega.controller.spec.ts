import { Test, TestingModule } from '@nestjs/testing';
import { ArchivoEntregaController } from './archivo_entrega.controller';
import { ArchivoEntregaService } from './archivo_entrega.service';

describe('ArchivoEntregaController', () => {
  let controller: ArchivoEntregaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchivoEntregaController],
      providers: [ArchivoEntregaService],
    }).compile();

    controller = module.get<ArchivoEntregaController>(ArchivoEntregaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
