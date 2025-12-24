import { ApiProperty } from "@nestjs/swagger";

export class LoginDto{
    @ApiProperty({title: "User login", type: "string"})
    readonly login: string;
    
    @ApiProperty({title: "User password", type: "string"})
    readonly password: string;
}