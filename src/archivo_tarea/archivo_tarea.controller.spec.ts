import { Test, TestingModule } from '@nestjs/testing';
import { ArchivoTareaController } from './archivo_tarea.controller';
import { ArchivoTareaService } from './archivo_tarea.service';

describe('ArchivoTareaController', () => {
  let controller: ArchivoTareaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchivoTareaController],
      providers: [ArchivoTareaService],
    }).compile();

    controller = module.get<ArchivoTareaController>(ArchivoTareaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
