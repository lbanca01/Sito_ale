import { FaTimes, FaPhotoVideo } from 'react-icons/fa'

const Task = ({ task, onDelete, onAdd }) => {
  return (
    <div className={`task ${task.foto ? 'reminder' : '' }`}>
      <h3>
        {task.text} 
        <div>
          <a href={task.foto ? task.foto : null }>
            <FaPhotoVideo onClick={() => !task.foto && 
              onAdd(task.id, prompt("Aggiungi il link con le foto"))}/>
          </a> 
          <FaTimes onClick={() => onDelete(task.id)} 
            style={{ color: "red" }} />
        </div>
      </h3>
    </div>
  )
}

export default Task;