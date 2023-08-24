import { Button, ResetButton } from './components/Buttons'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const change = (step, operation) => {
    operation == '+' ? setCount(count + step) : setCount(count - step)
  }
  const reset = (value) => {
    setCount(value)
  }
  return (
    <div className='App'>
      <h1>Counter: {count}</h1>
      <Button operation={'+'} step={1} increment={change} />
      <Button operation={'+'} step={10} increment={change} />
      <Button operation={'+'} step={100} increment={change} />
      <Button operation={'-'} step={1} increment={change} />
      <Button operation={'-'} step={10} increment={change} />
      <Button operation={'-'} step={100} increment={change} />
      <ResetButton value={0} func={reset} />
    </div>
  )
}

export default App