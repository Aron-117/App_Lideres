import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { RolesGuard } from 'src/auth/decorators/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @Roles('Profesor')
  create(@Body() createMaterialDto: CreateMaterialDto, @Req() req) {
    return this.materialService.create(createMaterialDto, req.user?.sub);
  }

  @Get()
  @Roles('Admin')
  findAll() {
    return this.materialService.findAll();
  }

  @Get(':id')
  @Roles('Admin', 'Profesor')
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Admin', 'Profesor')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  @Roles('Admin', 'Profesor')
  remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }
}
