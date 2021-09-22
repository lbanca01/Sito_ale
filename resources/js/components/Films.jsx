import Film from "./Film";
import AddTask from "./AddTask";

const Tasks = ({ tasks, onDelete, onAdd, showAdd, onAddTask, onSeen }) => {
  return (
    <>
      {showAdd && <AddTask onAdd={onAddTask} />}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Film key={task.id} task={task} 
          onDelete={onDelete} onAdd={onAdd}
          onSeen={onSeen}/>
        ))
        ) : (
          'Dovremmo vederci qualcosa'
        )}      
    </>
  )
}

export default Tasks;