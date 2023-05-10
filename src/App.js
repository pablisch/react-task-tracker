// import logo from './logo.svg';
import { useState } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import './App.css';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
    "id": 1,
    "text": "One",
    "day": "before",
    "reminder": true
    },
    {
    "id": 2,
    "text": "Two",
    "day": "now",
    "reminder": true
    },
    {
    "id": 3,
    "text": "Three",
    "day": "after",
    "reminder": false
    }
  ])

  // add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    console.log(task)
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)) // sets tasks to all tasks except the one that matches the id of the task being deleted
    console.log('delete', id)
  }
  
  // toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task
    ))
    console.log(id)
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleReminder} /> : <h3>No tasks to show</h3>}
    </div>
  );
}

export default App;
