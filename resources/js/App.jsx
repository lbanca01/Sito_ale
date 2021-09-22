import Header from './components/Header'
import Footer from './components/Footer'
import Ristoranti from './components/Ristoranti'
import Films from './components/Films'
import About from './components/About'
import Fotos from './components/Fotos'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

var workingTable = "travels"
const url = "http://localhost:8000"

function App() {

  const [showAdd, setShowAdd] = useState(false)
  const [tasks, setTasks] = useState([])

  const refresh = () => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }

  useEffect(() => {
    refresh()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(`${url}/api/${workingTable}`, {
      method: 'GET'
    })

    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`${url}/api/${workingTable}/${id}` , {
      method: 'GET'
    })
    const data = await res.json()

    return data
  }
  
  // Add Task #TO-DO aggiungi seen
  const addTask = async (task) => {
    if (task.seen){
      await fetch(`${url}/api/${workingTable}`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          "text" : task.text,
          "desc" : task.desc,
          "seen" : `${task.seen == "1" ? "1" : "0"}`,
        })
      })
    }else{
      await fetch(`${url}/api/${workingTable}`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          'text' : `${task.text}`,
          'desc' : `${task.desc}`,
        })
      })
    }

    // const data = await res.json()
    // console.log(data)
    // setTasks([...tasks, data])
    refresh()
  }

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`${url}/api/${workingTable}/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const task = fetchTask(id)
    await fetch(`${url}/api/${workingTable}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          "text" : task.text,
          "desc" : task.desc,
          "seen" : `${task.seen == "1" ? "0" : "1"}`,
        })
      })          
    
    refresh()
  }
  
  const addParam = async (id, desc) => {
    if (!desc)
      return
    const task = fetchTask(id)
     await fetch(`${url}/api/${workingTable}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          'text' : task.text,
          'desc' : desc,
        })
      })          
    
    refresh()
  }

  const setTable = (table) => {
    workingTable = table
  }
  
  return (
    <Router>
      <h1 className='center'>Ricordi da fare</h1>
      <div className='container'>
        <Header
          onAdd={() => setShowAdd(!showAdd)}
          showAdd={showAdd}
          setTitle={setTable}
          refreshTasks={refresh}
        />
        <Redirect from='/' to='/travels' />
        <Route path='/travels' render={(props) => (<Fotos
                  tasks={tasks}
                  onDelete={deleteTask}
                  onAddTask={addTask}
                  onAdd={addParam}
                  showAdd={showAdd}
                />)} />
        <Route path='/restaurants' render={(props) => (<Ristoranti
                  tasks={tasks}
                  onDelete={deleteTask}
                  onAddTask={addTask}
                  onAdd={addParam}
                  showAdd={showAdd}
                  onSeen={toggleReminder}
                />)} />
        <Route path='/films' render={(props) => (<Films
                  tasks={tasks}
                  onDelete={deleteTask}
                  onAddTask={addTask}
                  onAdd={addParam}
                  showAdd={showAdd}
                  onSeen={toggleReminder}
                />)} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )

}

export default App;
