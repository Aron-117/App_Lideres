import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Ip,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AuthGuard, Public } from './auth.guard';
import { LogAccesoService } from 'src/log-acceso/log-acceso.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly LogAccesoService: LogAccesoService,
    private readonly UsuarioService: UsuarioService,
  ) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() signInDto: Record<string, any>,
    @Ip() ipServer: string,
    @Headers('x-forwarded-for') forwarderFor: string,
    @Headers('user-agent') browser: string,
  ) {
    const ip = forwarderFor ? forwarderFor.split(',')[0].trim() : ipServer;
    const usuario = await this.UsuarioService.findOneByEmail(signInDto.correo);
    const result = await this.authService.login(
      signInDto.correo,
      signInDto.password,
    );
    if (result) {
      await this.LogAccesoService.create({
        usuario: usuario?.nombre || 'Usuario no reconocido',
        ip: ip,
        evento: 'ingreso',
        browser: browser || 'Desconocido',
        fecha: new Date(),
      });
    }
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(
    @Request() req,
    @Ip() ip: string,
    @Headers('user-agent') browser: string,
  ) {
    const usuario = await this.UsuarioService.findOne(req.user?.sub);
    await this.LogAccesoService.create({
      usuario: usuario?.nombre || 'Usuario no reconocido',
      ip: ip,
      evento: 'salida',
      browser: browser || 'Desconocido',
      fecha: new Date(),
    });
    return { message: 'Log de salida registrado con exito' };
  }
}
