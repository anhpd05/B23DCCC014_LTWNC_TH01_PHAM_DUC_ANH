import { AssignmentForm } from './features/assignments/components/AssignmentForm';
import { AssignmentList } from './features/assignments/components/AssignmentList';

export default function App() {
  return (
    <main className="app">
      <h1>Student Deadline Tracker</h1>
      <AssignmentForm />
      <AssignmentList>
        <AssignmentList.Filters />
        <AssignmentList.Items />
        <AssignmentList.Empty>Chưa có bài tập nào trong mục này</AssignmentList.Empty>
      </AssignmentList>
    </main>
  );
}
