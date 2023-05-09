// import logo from './logo.svg';
import { useState } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([{
    "id": "1",
    "text": "Hello"
  }])
  return (
    <div className="container">
      <Header />
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
