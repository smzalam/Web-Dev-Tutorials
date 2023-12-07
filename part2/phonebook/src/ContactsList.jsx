import React from 'react'

const ContactsList = ({ contacts }) => {
    return (
        <>
            <h2>Numbers</h2>
            <div>
                <ul>
                    {contacts.map((person) => (
                        <li key={person.id}>
                            {person.name} {person.number}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ContactsList