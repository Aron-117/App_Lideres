import { Test, TestingModule } from '@nestjs/testing';
import { ArchivoMaterialService } from './archivo_material.service';

describe('ArchivoMaterialService', () => {
  let service: ArchivoMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArchivoMaterialService],
    }).compile();

    service = module.get<ArchivoMaterialService>(ArchivoMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
