
const ContactsList = ({ contacts, handleDeletingContact }) => {
    return (
        <>
            <h2>Numbers</h2>
            <div>
                <ul>
                    {contacts.map((person) => (
                        <li key={person.id}>
                            {person.name} {person.number} <button 
                                                            onClick={handleDeletingContact(person.id)}
                                                          >
                                                            delete
                                                          </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ContactsList