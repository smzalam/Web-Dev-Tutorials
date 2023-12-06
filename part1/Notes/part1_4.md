### More Complex States + React Debugging
#### Complex State
What if our applications requires a complex state that does not fit into one useState function?
Well, we just call the useState function multiple times.
For example:
```js
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  return (
    <div>
      {left}
      <button onClick={() => setLeft(left + 1)}>
        left
      </button>
      <button onClick={() => setRight(right + 1)}>
        right
      </button>
      {right}
    </div>
  )
}
```

Here we have two states for `left` and `right` each. However, this can be simplified by storing these two values in one `useState` function as an object and adding event handlers for both left and right clicks.
```js
const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    const newClicks = { 
      left: clicks.left + 1, 
      right: clicks.right 
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = { 
      left: clicks.left, 
      right: clicks.right + 1 
    }
    setClicks(newClicks)
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}
```

We can simplify this further by boiling down the event handlers to:
```js
const handleLeftClick = () =>
  setClicks({ ...clicks, left: clicks.left + 1 })

const handleRightClick = () =>
  setClicks({ ...clicks, right: clicks.right + 1 })
```

We use the `...` spread syntax to create a new copy of the clicks object and then increment the desired property by one.

##### Notes
* Doing `clicks.left++` or `clicks.right++` is forbidden in React as mutating state directly can result in unexpected side effects.
* Storing all the state in a single state object is a bad choice for complex applications. It is much better to store states or pieces of applications state in a [more complex data structure](https://react.dev/learn/choosing-the-state-structure).

#### Handling Arrays
Imagine a new state that is defined as an array of all clicks made in our application. 
Then our state would look like:
```js
const [allClicks, setAll] = useState([])
```
Then, we would adjust our event handlers to update the array by concatenating the type of click to it:
```js
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }
```

Finally, we would list out all our clicks in our application in the following way:
```js
const App = () => {
  // ...

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}

      <p>{allClicks.join(' ')}</p>
    </div>
  )
}
```
The `.join(' ')` operator converts the entire array into a string with each item separated by a space, i.e. `' '`. 

#### State Updates are Asynchronous
State updates in React happen asynchronously, i.e. not immediately but at some point before the component is rendered again. That means that if we want to print out a value based on a state update, it might not work as intended due to asynchronous state updates. 

#### Conditional Rendering
In React, we can use conditional rendering to allow components to return different layouts according to conditions. For example, using our example above, take the following scenario where we implement a *History* component:
```js
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  // ...

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}

      <History allClicks={allClicks} />
    </div>
  )
}
```
Now, our History components returns different layouts, i.e. when no clicks have been made it returns instructions, otherwise it returns the string version of all the clicks made.

This conditional rendering was done by using an `if` statement.. There are other ways to implement conditional rendering which will be seen later.

#### Debugging React Applications
We can implement debugging in React Applications in multiple ways. However, the most important aspect to understand is to always have the developer console open at all times. Then, we can start debugging by doing one of the following:
* Using console.log statements at certain points to check the state and execution of our application
* Using the `debugger` command anywhere in our application which stops the execution when the web page reaches that line. Then, we can check the states and app execution by going to the console tab.
	* ![[Pasted image 20231206000018.png]]
* Can go to the *sources* tab in the developer console and add breakpoints in our file. Then, check the variable values in the `scope` section of the sources tab.
	* ![[Pasted image 20231206000031.png]]
* Adding *React Developer Tools* extension to Chrome helps by checking each component and its associated props, states, and sources.
	* ![[Pasted image 20231206000043.png]]
	* ![[Pasted image 20231206000106.png]]


#### Rules of Hooks
**Hooks can ONLY be called from inside a function that defines a React component.** 
They cannot be called from inside of a loop, a conditional expression, or any place that is not a function defining a component. 

#### Event Handlers
For event handlers, we have to make sure that we pass in a function to the property handling the event. 
For example, for the `onCick={}` property in buttons, we have to pass in  a function or a reference to a function rather than a call to  a function or any other data type such as strings or integers.
However, we can send in function calls that return a function. 
That is, something like the following:
```js
const App = () => {
  const [value, setValue] = useState(10)


  const hello = () => {
    const handler = () => console.log('hello world')
    return handler
  }

  return (
    <div>
      {value}
      <button onClick={hello()}>button</button>
    </div>
  )
}
```
where `hello()` returns the function `handler` to the `onClick` property. 

The advantage of this technique is that we can assign arguments to the `hello()` function and can call it in any `onClick` property on any button for customizing a generic event handler. One such implementation is show below:
```js
const App = () => {
  const [value, setValue] = useState(10)
  

  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }
  
  return (
    <div>
      {value}

      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}
```
We could also implement the above like the following to avoid having to create a function that returns a function:
```js
const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>
        thousand
      </button>
      <button onClick={() => setToValue(0)}>
        reset
      </button>
      <button onClick={() => setToValue(value + 1)}>
        increment
      </button>
    </div>
  )
}
```

#### Passing Event Handlers to Child Components
To pass in event handlers to child components, we simply pass in a function as a prop.

Take a *Button* component for example:
```js
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  // ...
  return (
    <div>
      {value}

      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```

Here we pass in a function `() => setToValue(value)` as a prop that is then referenced in the actual child component by its name. 

#### Defining Components inside Other Components
In React, it is not allowed to create new components inside another component.
```js
// This is the right place to define a component
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  // Do not define components inside another component

  const Display = props => <div>{props.value}</div>

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```

