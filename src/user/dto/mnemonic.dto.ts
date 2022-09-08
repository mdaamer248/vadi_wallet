import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class MnemonicDto {
    @ApiProperty()
    @IsNotEmpty()
    mnemonic : string;

}