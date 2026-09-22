export interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}
