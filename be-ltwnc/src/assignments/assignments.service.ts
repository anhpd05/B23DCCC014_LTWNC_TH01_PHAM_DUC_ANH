import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { createAssignmentsMock } from './mock/assignments.mock';

@Injectable()
export class AssignmentsService {
  private items: Assignment[] = createAssignmentsMock();

  create(createAssignmentDto: CreateAssignmentDto): Assignment {
    const assignment: Assignment = {
      id: randomUUID(),
      completed: false,
      ...createAssignmentDto,
    };
    this.items.push(assignment);
    return assignment;
  }

  findAll(): Assignment[] {
    return this.items;
  }

  findOne(id: string): Assignment {
    const found = this.items.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException(`Không tìm thấy assignment với id "${id}"`);
    }
    return found;
  }

  update(id: string, updateAssignmentDto: UpdateAssignmentDto): Assignment {
    const found = this.findOne(id);
    Object.assign(found, updateAssignmentDto);
    return found;
  }

  remove(id: string): Assignment {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Không tìm thấy assignment với id "${id}"`);
    }
    const [removed] = this.items.splice(index, 1);
    return removed;
  }
}
