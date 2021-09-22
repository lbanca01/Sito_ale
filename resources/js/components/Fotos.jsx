import Task from "./Foto";
import AddTask from "./AddTask";

const Tasks = ({ tasks, onDelete, onAdd, showAdd, onAddTask }) => {
  return (
    <>
      {showAdd && <AddTask onAdd={onAddTask} table={"viaggi"}/>}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task key={task.id} task={task} 
          onDelete={onDelete} onAdd={onAdd}/>
        ))
        ) : (
          'Nessun posto da vedere'
        )}      
    </>
  )
}

export default Tasks;