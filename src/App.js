import Header from './components/Header'
import Footer from './components/Footer'
import Ristoranti from './components/Ristoranti'
import Films from './components/Films'
import About from './components/About'
import Fotos from './components/Fotos'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

var workingTable = "viaggi"
const url = "http://localhost"
const port = 5000
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
    const res = await fetch(`${url}:${port}/${workingTable}`)
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`${url}:${port}/${workingTable}/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(`${url}:${port}/${workingTable}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

  }

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`${url}:${port}/${workingTable}/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, seen: !taskToToggle.seen }

    const res = await fetch(`${url}:5000/${workingTable}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, seen: data.seen } : task
      )
    )
  }
  
  const addParam = async (id, desc) => {
    if (!desc)
      return
    const fotoToAdd = await fetchTask(id)
    const upd = { ...fotoToAdd, desc: desc}

    const res = await fetch(`${url}:${port}/${workingTable}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(upd),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, desc: data.desc } : task
      )
    )
  }

  const setTable = (table) => {
    workingTable = table
  }
  
  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAdd(!showAdd)}
          showAdd={showAdd}
          setTitle={setTable}
          refreshTasks={refresh}
        />
        <Redirect from="/" to="/viaggi" />
        <Route path='/viaggi' render={(props) => (<Fotos
                  tasks={tasks}
                  onDelete={deleteTask}
                  onAddTask={addTask}
                  onAdd={addParam}
                  showAdd={showAdd}
                />)} />
        <Route path='/ristoranti' render={(props) => (<Ristoranti
                  tasks={tasks}
                  onDelete={deleteTask}
                  onAddTask={addTask}
                  onAdd={addParam}
                  showAdd={showAdd}
                  onSeen={toggleReminder}
                />)} />
        <Route path='/film' render={(props) => (<Films
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
