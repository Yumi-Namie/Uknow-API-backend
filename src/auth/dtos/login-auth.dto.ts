import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto{
    @IsEmail()
    email: string;

    @MinLength(8)
    @MaxLength(24)
    password: string;
}