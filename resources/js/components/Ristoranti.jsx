import Ristorante from "./Ristorante";
import AddTask from "./AddTask";

const Tasks = ({ tasks, onDelete, onAdd, showAdd, onAddTask, onSeen }) => {
  return (
    <>
      {showAdd && <AddTask onAdd={onAddTask} />}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Ristorante key={task.id} task={task} 
          onDelete={onDelete} onAdd={onAdd}
          onSeen={onSeen}/>
        ))
        ) : (
          'Dobbiamo andare a mangaire da qualche parte'
        )}      
    </>
  )
}

export default Tasks;