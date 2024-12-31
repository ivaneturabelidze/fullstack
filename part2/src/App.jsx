import { useEffect, useState } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {

  const [newNote, setNewNote] = useState('')
  const [notes, setNotes] = useState([])
  const [important, setImportant] = useState(false)
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  // const hook = () => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setPersons(response.data)
  //     })
  // }

  // useEffect(hook, [])

  // console.log('render', persons.length, 'notes')

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
    .update(id, changedNote)
    .then(response => {
      setNotes(notes.map(n => n.id === id ? changedNote : n))
    })
    .catch(error => {
      setErrorMessage(
        error.message
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const addNote = event => {
    event.preventDefault()
    if (!newNote) {
      setErrorMessage('content missing!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    const noteObject = {
      content: newNote,
      important: important
    }
  
  
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      console.log(returnedNote)
      setNewNote('')
      document.getElementById("content").value = ''
    })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <form onSubmit={addNote}>
        <label>content:</label>
        <input type="text" id="content" onChange={event => setNewNote(event.target.value)}/>
        <label>important</label>
        <input type="checkbox" onChange={event => setImportant(event.target.value == "on" ? true : false)}/>
        <button type="submit">post</button>
      </form>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      
      <Footer/>

    </div>
  )
}

export default App