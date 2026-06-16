import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioRepetido = await this.findOneByEmail(createUsuarioDto.correo);
    if (usuarioRepetido) {
      throw new ConflictException('Correo existente');
    }
    const saltRounds = 10;
    createUsuarioDto.password = await bcrypt.hash(
      createUsuarioDto.password,
      saltRounds,
    );
    const usuario = this.usuarioRepository.create(createUsuarioDto);
    usuario.fecha_registro = new Date();
    return await this.usuarioRepository.save(usuario);
  }
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }
  async findOne(id: number): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({ where: { id_usuario: id } });
  }
  async findEstudiantes() {
    return await this.usuarioRepository.find({ where: { rol: 'Estudiante' } });
  }
  async findProfesores() {
    return await this.usuarioRepository.find({ where: { rol: 'Profesor' } });
  }
  async findOneByEmail(email: string) {
    return await this.usuarioRepository.findOneBy({ correo: email });
  }
  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const updatedUsuario = this.usuarioRepository.merge(
      usuario,
      updateUsuarioDto,
    );
    await this.usuarioRepository.save(updatedUsuario);
    return await this.findOne(id);
  }
  // async migrarPasswordsPlaintext() {
  //   const usuarios = await this.usuarioRepository.find();
  //   let actualizados = 0;

  //   for (const usuario of usuarios) {
  //     // Si la contraseña NO empieza con el formato de bcrypt ($2b$), asumimos que es texto plano
  //     if (!usuario.password.startsWith('$2b$')) {
  //       const saltRounds = 10;
  //       usuario.password = await bcrypt.hash(usuario.password, saltRounds);
  //       await this.usuarioRepository.save(usuario);
  //       actualizados++;
  //     }
  //   }
  //   return {
  //     mensaje: `Migración completada. Se encriptaron ${actualizados} contraseñas antiguas.`,
  //   };
  // }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.usuarioRepository.remove(usuario);
    return usuario;
  }
}
