import Header from './components/Header'
import Footer from './components/Footer'
import Ristoranti from './components/Ristoranti'
import Films from './components/Films'
import About from './components/About'
import Fotos from './components/Fotos'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

var workingTable = "viaggi"
const url = "https://aledb.netsons.org"

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
    var a = "${url}/read.php?table=${workingTable}"
    const res = await fetch(`${url}/read.php?table=${workingTable}`, {
      method: 'POST'
    })


    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`${url}/read.php?table=${workingTable}&id=${id}`)
    const data = await res.json()

    return data
  }

  // Add Task #TO-DO aggiungi seen
  const addTask = async (task) => {
    if (task.seen){
      await fetch(`${url}/insert.php?table=${workingTable}&text=${task.text}&desc=${task.desc}&seen=${task.seen == "1" ? "1" : "0"}`, {
        method: 'POST'
      })
    }else{
      await fetch(`${url}/insert.php?table=${workingTable}&text=${task.text}&desc=${task.desc}`, {
        method: 'POST'
      })
    }
    

    // const data = await res.json()

    // setTasks([...tasks, data])
    refresh()
  }

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`${url}/delete.php?table=${workingTable}&id=${id}`, {
      method: 'POST',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)

    await fetch(`${url}/update.php?table=${workingTable}&id=${id}&param=seen&value=${taskToToggle[0].seen == "1" ? "0" : "1"}`, {
      method: 'POST'
    })
    // const res = 
    // const data = await res.json()
    // 
    // setTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, seen: data.seen } : task
    //   )
    // )

    refresh()
  }
  
  const addParam = async (id, desc) => {
    if (!desc)
      return

    await fetch(`${url}/update.php?table=${workingTable}&id=${id}&param=desc&value=${desc}`, {
      method: 'POST'
    })

    // const data = await res.json()
    // 
    // setTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, desc: data.desc } : task
    //   )
    // )
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
