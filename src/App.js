// mock backend server build
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';
import './App.css';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, []) // the empty array (2nd arg) is not needed here as it is implicit if ommitted.
  // the empty array shows dependencies and since there are none, useEffect will run only when the component mounts

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000) + 1
    // console.log(task)
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id)) // sets tasks to all tasks except the one that matches the id of the task being deleted
    console.log('delete', id)
  }
  
  // toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'appplication/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder:
            data.reminder } : task
      )
    )
    console.log(id)
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        
        <Routes>
          <Route path='/' exact render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ?
                (<Tasks tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder} />) : (<h3>No tasks to show</h3>)}
            </>
          )} />
          <Route path='/about' component={About} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
