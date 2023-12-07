import { useState } from 'react'
import Filter from './Filter'
import AddingContact from './AddingContact'
import ContactsList from './ContactsList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('all')

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    console.log(newPerson)
    if (newName !== '') {
      const personInContacts = (persons.filter((person) => person.name === newName)).length > 0 ? true : false
      if (personInContacts) {
        alert(`${newName} is already added to phonebook`)
      }
      if (!personInContacts) {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setnewNumber('')
      }
    }
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberInputChange = (event) => {
    setnewNumber(event.target.value)
  }
  const handleFilterInputChange = (event) => {
    console.log(event.target.value)
    console.log(newFilter)
    setNewFilter(event.target.value)
  }

  const contactsToShow = newFilter === 'all'
    ? persons
    : persons.filter(person => person.name === newFilter)


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handler={handleFilterInputChange} />
      <AddingContact
        formHandler={handleFormSubmit}
        nameValue={newName}
        numberValue={newNumber}
        nameHandler={handleNameInputChange}
        numberHandler={handleNumberInputChange}
      />
      <ContactsList contacts={contactsToShow} />
    </div>
  )
}

export default App