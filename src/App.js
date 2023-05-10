// mock backend server build
import { useState, useEffect } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import './App.css';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()

      console.log(data)
    }

    fetchTasks()
  }, []) // the empty array (2nd arg) is not needed here as it is implicit if ommitted.
  // the empty array shows dependencies and since there are none, useEffect will run only when the component mounts 

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
