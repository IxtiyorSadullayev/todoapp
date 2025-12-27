import { ApiProperty } from "@nestjs/swagger";

export class CreateLessonDto {
    @ApiProperty({type: 'string', title: 'Lesson title'})
    readonly title: string;
    
    @ApiProperty({type: 'string', title: 'Lesson description'})
    readonly description: string;

    
    @ApiProperty({type: 'string', title: 'Lesson date'})
    readonly begin_date: Date;

    
    @ApiProperty({type: 'string', title: 'Lesson home work'})
    readonly home_work: string;

}
