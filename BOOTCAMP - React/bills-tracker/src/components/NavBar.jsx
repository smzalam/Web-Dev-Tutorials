function NavBar(props) {
    return (
        <ul className='list-reset flex justify-center border-b-4 mb-0'>
            {/* map all the listed categories in the navbar using map function */}
            {props.categories
                ? props.categories.map((value, index) => {
                    return (
                        <li
                            className='p-4 inline bg-grey-lighter hover:bg-grey-light uppercase font-black cursor-pointer'
                            key={index}>
                            {value}
                        </li>
                    )
                })
                : '<li>No categories</li>'}
            {/* add an option to add another category if wanted */}
            <li
                className='p-4 inline bg-grey-lighter hover:bg-grey-light uppercase font-black cursor-pointer'
                onClick={() => props.showAddCategory()}>
                ➕
            </li>
        </ul>
    )
}

export default NavBar;