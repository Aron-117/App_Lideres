import { Test, TestingModule } from '@nestjs/testing';
import { ArchivoMaterialController } from './archivo_material.controller';
import { ArchivoMaterialService } from './archivo_material.service';

describe('ArchivoMaterialController', () => {
  let controller: ArchivoMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchivoMaterialController],
      providers: [ArchivoMaterialService],
    }).compile();

    controller = module.get<ArchivoMaterialController>(ArchivoMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
