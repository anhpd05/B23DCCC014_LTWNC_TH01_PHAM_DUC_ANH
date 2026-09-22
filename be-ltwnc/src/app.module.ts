import { Module } from '@nestjs/common';
import { AssignmentsModule } from './assignments/assignments.module';

@Module({
  imports: [AssignmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
