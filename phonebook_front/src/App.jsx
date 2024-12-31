import { useEffect, useState } from 'react'
import './App.css'
import personsService from './services/persons'
import Person from './components/Person'
import Notification from './components/Notification'

function App() {
  
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [newPerson, setNewPerson] = useState({})

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    personsService.create({
      name: name,
      number: number
    })
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      document.getElementById('name').value = ''
      document.getElementById('number').value = ''
    })
    .catch(error => {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
        document.getElementById('name').value = ''
        document.getElementById('number').value = ''
      }, 5000)
    })
  }

  return (
    <>
      <h1>Phonebook app</h1>
      <Notification message={errorMessage} />
      <form onSubmit={addPerson}>
        <label>name</label>
        <input type="text" id="name" onChange={event => {
          setName(event.target.value)
        }}/>
        <br />
        <label>phone number</label>
        <input type="text" id="number" onChange={event => setNumber(event.target.value)}/>
        <br />
        <button type="submit">add person</button>
      </form>
      {persons.map(person => <Person data={person}/>)}
    </>
  )
}

export default App
