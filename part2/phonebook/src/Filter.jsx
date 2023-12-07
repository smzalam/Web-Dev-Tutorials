import React from 'react'

const Filter = ({ newFilter, handler }) => {
    return (
        <>
            <h2>Filter contacts list</h2>
            <p>Enter 'all' to show all contacts</p>
            <div>
                filter shown with <input
                    value={newFilter}
                    onChange={handler}
                />
            </div>
        </>
    )
}

export default Filter