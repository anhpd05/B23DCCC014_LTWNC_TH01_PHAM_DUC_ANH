import { randomUUID } from 'node:crypto';
import { Assignment } from '../entities/assignment.entity';

const inDays = (d: number) => new Date(Date.now() + d * 86_400_000).toISOString();

export const createAssignmentsMock = (): Assignment[] => [
  {
    id: randomUUID(),
    subject: 'LTWNC',
    title: 'Nộp báo cáo đồ án giữa kỳ',
    dueDate: inDays(-3),
    priority: 'high',
    completed: true,
  },
  {
    id: randomUUID(),
    subject: 'CSDL',
    title: 'Hoàn thành bài lab chuẩn hoá',
    dueDate: inDays(-1),
    priority: 'medium',
    completed: false,
  },
  {
    id: randomUUID(),
    subject: 'Mạng máy tính',
    title: 'Nộp bài tập TCP/IP',
    dueDate: inDays(0),
    priority: 'high',
    completed: false,
  },
  {
    id: randomUUID(),
    subject: 'Toán rời rạc',
    title: 'Làm bài tập chương đồ thị',
    dueDate: inDays(2),
    priority: 'medium',
    completed: false,
  },
  {
    id: randomUUID(),
    subject: 'Anh văn chuyên ngành',
    title: 'Thuyết trình nhóm',
    dueDate: inDays(5),
    priority: 'low',
    completed: false,
  },
  {
    id: randomUUID(),
    subject: 'LTWNC',
    title: 'Ôn tập kiểm tra cuối kỳ',
    dueDate: inDays(10),
    priority: 'low',
    completed: false,
  },
];
