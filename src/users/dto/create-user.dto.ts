import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({title: "User login", type: 'string'})
    readonly login: string;
    
    @ApiProperty({title: "User password", type: 'string'})
    readonly password: string;

    @ApiProperty({title: "User fullname", type: 'string'})
    readonly fullname: string;

    @ApiProperty({title: "User phoneNumber", type: 'string'})
    readonly phoneNumber: string;

    @ApiProperty({title: "User birthday", type: 'string'})
    readonly birthday: Date;

}
