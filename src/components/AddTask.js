import { useState } from 'react'

const AddTask = ({ onAdd, table }) => {
  const [text, setText] = useState('')
  const [desc, setDesc] = useState('')
  const [seen, setSeen] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text){
      alert('Add a task')
      return
    }

    if (table !== "viaggi")
      onAdd({text, desc, seen})
    else
      onAdd({text, desc})

    setText('')
    setDesc('')
    setSeen(false)

  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Titolo</label>
        <input type="text" placeholder="Add task" 
        value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
      <div className='form-control'>
        <label>Descrizione</label>
        <input type="text" placeholder="Add foto" 
        value={desc} onChange={(e) => setDesc(e.target.value)}/>
      </div>
      <div className='form-control form-control-check'>
        <label>Visto</label>
        <input type="checkbox" checked={seen}
        value={seen} onChange={(e) => setSeen(e.currentTarget.checked)}/>
      </div>
      <input type="submit" className="btn btn-block"/>
    </form>
  )
}

export default AddTask;