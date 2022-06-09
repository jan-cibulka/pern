import './App.css';
import ImportTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';
function App() {
  return (
    <div className="w-50 m-auto">
      <ImportTodo />
      <ListTodo />
    </div>
  );
}

export default App;
