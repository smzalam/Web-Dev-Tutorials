import { useState } from 'react'
import Filter from './Filter'
import AddingContact from './AddingContact'
import ContactsList from './ContactsList'
import contactService from './service/contacts'
import { useEffect } from 'react'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('all')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    contactService.
      getAll().
      then((response) => {
        setPersons(response)
      })
  }, [])

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (newName !== '') {
      const personInContacts = (persons.filter((person) => person.name === newName))
      if (personInContacts.length > 0) {
        const existingContact = personInContacts[0]
        const updatedContact = { ...existingContact, number: newNumber }
        if (window.confirm(`${existingContact.name} is already added to phonebook, replace the old number with a new one?`)) {
          if (personInContacts.filter(person => person.number === newNumber).length === 0) {
            contactService.
              updateNumber(existingContact.id, updatedContact).
              then(request => {
                setPersons(persons.map(person => person.id !== existingContact.id ? person : request))
              }).
              catch(() => {
                setMessageType('error')
                setMessage(
                  `Information of ${existingContact.name}' has already been removed from server`
                ),
                  setTimeout(() => {
                    setMessage(null)
                  }, 5000)
              }

              )
          }
        }
      }
      if (!(personInContacts.length > 0)) {
        contactService.
          addContact(newPerson).
          then(response => {
            setPersons(persons.concat(response))
            setMessageType('success')
            setMessage(
              `Added '${response.name}'`
            ),
              setTimeout(() => {
                setMessage(null)
              }, 5000)
          })
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
    setNewFilter(event.target.value)
  }
  const handleDeletingContact = (id) => {
    return () => {
      console.log(id)
      const person = persons.filter(person => person.id === id && person)[0]
      console.log(person)
      if (window.confirm(`Delete ${person.name}`)) {
        contactService.
          deleteContact(id)

        const newContactsList = persons.filter(person => person.id !== id)
        setPersons(newContactsList)
      }
    }
  }


  const contactsToShow = newFilter === 'all'
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification type={messageType} message={message} />
      <Filter
        newFilter={newFilter}
        handler={handleFilterInputChange}
      />
      <AddingContact
        formHandler={handleFormSubmit}
        nameValue={newName}
        numberValue={newNumber}
        nameHandler={handleNameInputChange}
        numberHandler={handleNumberInputChange}
      />
      <ContactsList
        contacts={contactsToShow}
        handleDeletingContact={handleDeletingContact}
      />
    </div>
  )
}

export default App