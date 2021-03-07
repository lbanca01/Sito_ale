import { FaTimes, FaCommentAlt } from 'react-icons/fa'

const Task = ({ task, onDelete, onAdd, onSeen }) => {
  return (
    <div className={`task ${task.seen ? 'reminder' : '' }`}>
      <h3 onDoubleClick={() => onSeen(task.id)}>
        {task.text} 
        <div>
          <FaCommentAlt onClick={() => !task.foto && 
            onAdd(task.id, prompt("Aggiungi descrizione"))}/>
          <FaTimes onClick={() => onDelete(task.id)} 
            style={{ color: "red" }} />
        </div>
      </h3>
      {task.desc}
    </div>
  )
}

export default Task;