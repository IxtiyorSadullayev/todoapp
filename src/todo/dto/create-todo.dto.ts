import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {
    @ApiProperty({title: "Todo title",type: "string"})
    readonly title: string;
    
    @ApiProperty({title: "Todo description",type: "string"})
    readonly description: string;
}
