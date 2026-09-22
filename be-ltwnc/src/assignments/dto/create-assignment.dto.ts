import { IsDateString, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsDateString()
  dueDate!: string;

  @IsIn(['low', 'medium', 'high'])
  priority!: 'low' | 'medium' | 'high';
}
