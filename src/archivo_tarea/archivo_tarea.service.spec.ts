import { Test, TestingModule } from '@nestjs/testing';
import { ArchivoTareaService } from './archivo_tarea.service';

describe('ArchivoTareaService', () => {
  let service: ArchivoTareaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArchivoTareaService],
    }).compile();

    service = module.get<ArchivoTareaService>(ArchivoTareaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
