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
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    // checks if category list exists
    // if does then skips showing add category form by default
    // otherwise activates category form
    const categoriesInLocalStorage = JSON.parse(
      localStorage.getItem('categories')
    )
    const billsInLocalStorage = JSON.parse(
      localStorage.getItem('bills')
    )

    setCategories(categoriesInLocalStorage)
    setBills(billsInLocalStorage)

    if (!categoriesInLocalStorage) {
      setShouldShowAddCategory(true)
    }

    if (!billsInLocalStorage) {
      setShouldShowAddBill(true)
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

  const addBills = (amount, category, date) => {
    const bill = { amount, category, date }
    const updatedBills = [...(bills || []), bill]
    setBills(updatedBills)
    setShouldShowAddBill(false)
    localStorage.setItem('bills', JSON.stringify(updatedBills))
  }

  const showAddCategory = () => {
    setShouldShowAddCategory(true)
  }

  const showAddBill = () => {
    setShouldShowAddBill(true)
  }

  const removeBill = index => {
    let updatedBills = [...bills]
    updatedBills = updatedBills
      .slice(0, index)
      .concat(updatedBills.slice(index + 1, updatedBills.length))
    setBills(updatedBills)
    localStorage.setItem('bills', JSON.stringify(updatedBills))
  }

  const activeBills = () => {
    return bills
      ?.filter(bill =>
        activeCategory ? bill.category === activeCategory : true
      )
      .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
  }

  const setNewActiveCategory = index => {
    setActiveCategory(index)
  }



  return (
    <div>
      {/* checks if condition is true or false for adding category on default */}
      {/* shows form if true */}
      {/* shows normal bills list if false */}
      {shouldShowAddCategory ? (
        <AddCategory onSubmit={addCategory} />
      ) : shouldShowAddBill ? (
        <AddBills onSubmit={addBills} categories={categories} />
      ) : (
        <div>
          <NavBar categories={categories} showAddCategory={showAddCategory} activeCategory={activeCategory} setNewActiveCategory={setNewActiveCategory} />
          <BillsTable bills={activeBills()} showAddBill={showAddBill} removeBill={removeBill} />
        </div>
      )}
    </div>
  )
}

export default App