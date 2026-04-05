import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}
  async login(
    correo: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const usuario = await this.usuarioService.findOneByEmail(correo);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (usuario.password !== password) {
      throw new NotFoundException('Contraseña incorrecta');
    }
    const payload = {
      correo: usuario.correo,
      sub: usuario.id_usuario,
      rol: usuario.rol,
      fecha_registro: usuario.fecha_registro,
      nombre: usuario.nombre,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
