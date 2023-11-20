import { IsNotEmpty, IsString } from 'class-validator';

export class MemberDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly birthDate: string;
}