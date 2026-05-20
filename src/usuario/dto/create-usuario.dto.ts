/* eslint-disable prettier/prettier */
import { IsString, IsEmail, MinLength, IsDateString } from 'class-validator';

export class CreateUsuarioDto {
    @IsString()
    @MinLength(3)
    nombre: string;
    @IsEmail()
    correo: string;
    @IsString()
    @MinLength(8)
    password: string;
    @IsString()
    @MinLength(4)
    rol: string;
}
