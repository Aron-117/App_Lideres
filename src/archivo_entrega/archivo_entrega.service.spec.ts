import { Test, TestingModule } from '@nestjs/testing';
import { ArchivoEntregaService } from './archivo_entrega.service';

describe('ArchivoEntregaService', () => {
  let service: ArchivoEntregaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArchivoEntregaService],
    }).compile();

    service = module.get<ArchivoEntregaService>(ArchivoEntregaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
