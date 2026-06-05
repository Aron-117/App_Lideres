import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
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
      throw new NotFoundException('Credenciales incorrectas');
    }
    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
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
