import { useState, useEffect } from 'react'
import AddBills from './components/AddBills'
import AddCategory from './components/AddCategory'
import BillsTable from './components/BillsTable'
import NavBar from './components/NavBar'

function App() {

  const [shouldShowAddCategory, setShouldShowAddCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [shouldShowAddBill, setShouldShowAddBill] = useState(false);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    // checks if category list exists
    // if does then skips showing add category form by default
    // otherwise activates category form
    const categoriesInLocalStorage = JSON.parse(
      localStorage.getItem('categories')
    )

    if (categoriesInLocalStorage !== categories) {
      setCategories(categoriesInLocalStorage)
    }

    if (!categoriesInLocalStorage) {
      setShouldShowAddCategory(true)
    }
  }, [])

  const addCategory = category => {
    // append new category to existing list of categories
    const updatedCategories = [...(categories || []), category]
    setCategories(updatedCategories)
    // set categories to updated list and set defualt show add category form to false
    setShouldShowAddCategory(false)
    // set category list in cache to save category list
    localStorage.setItem('categories', JSON.stringify(updatedCategories))
  }

  const showAddCategory = () => {
    setShouldShowAddCategory(true)
  }

  return (
    <div>
      {/* checks if condition is true or false for adding category on default */}
      {/* shows form if true */}
      {/* shows normal bills list if false */}
      {shouldShowAddCategory ? (
        <AddCategory onSubmit={addCategory} />
      ) : (
        <div>
          <NavBar categories={categories} showAddCategory={showAddCategory} />
          <BillsTable />
        </div>
      )}
    </div>
  )
}

export default App