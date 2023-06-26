import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState , useEffect } from "react"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  //tasks is the state and set update it
//states are immutable. You can set the states only
const [tasks, setTasks] = useState([])

useEffect(()=> {
 const getTasks = async()=> {
  const tasksFromServer = await fetchTasks()
  setTasks(tasksFromServer)
 }
  

  getTasks()
},[]) //you can pass your value/dependencies in the array

const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  return data

}

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data

}

//add server
const addTask = async(task)=>{
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])


//  const id = Math.floor(Math.random() * 10000) + 1 //generate id 
//  const newTask = {id,...task}
//  setTasks([...tasks, newTask])
}

//delete
const deleteTask = async(id)=> {
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE'
  })
  setTasks(tasks.filter((task)=> task.id !== id))
}

const reminder = async(id) =>{
  const taskToToggle = await fetchTask(id)
  const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  const res = await fetch (`http://localhost:5000/tasks/${id}`,{
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updateTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task)=> task.id === id ? {...task, reminder: 
    data.reminder} : task ))
}
  
  return (
    <Router>
    <div className="container">
      <Header onAdd= {()=> setShowAddTask(!showAddTask) }
      showAdd={showAddTask}
      />
      
      <Routes>
        <Route path= '/' exact Component={(props) =>(
          <>
            {showAddTask && <AddTask  onAdd={addTask}/>}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} reminder={reminder}/>
        : 'No Tasks to show'}

          </>
  )}/>
        <Route path='/about' Component={About}/>
      </Routes>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
