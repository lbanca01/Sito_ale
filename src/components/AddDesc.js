import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [foto, setFoto] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text){
      alert('Add a task')
      return
    }

    onAdd({text, foto, reminder}, "foto")

    setText('')
    setFoto('')
    setReminder(false)

  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Posto</label>
        <input type="text" placeholder="Add task" 
        value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
      <div className='form-control'>
        <label>Date</label>
        <input type="text" placeholder="Add foto" 
        value={foto} onChange={(e) => setFoto(e.target.value)}/>
      </div>
      <div className='form-control form-control-check'>
        <label>Visitato</label>
        <input type="checkbox" checked={reminder}
        value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
      </div>
      <input type="submit" className="btn btn-block"/>
    </form>
  )
}

export default AddTask;