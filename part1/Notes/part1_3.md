### Component State and Event Handlers
#### Helper Functions
Let's modify our Hello component from the previous section to now guess the year of the birth of the person being greeted. 
```js
const Hello = (props) => {

  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>

      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```
* Function for this feature is included in the component itself. 
* Shows up as a JavaScript function written before the return statement containing JSX. Then, it is called when the JSX is rendered.
* Standalone function does NOT need to have any arguments although it relies on a person's age, i.e. `props.age`. The reason for this is because any elements within a component can all access its props directly.
#### Destructuring
The way we currently pass props is by referencing the `props` keyword in our component arguments. However, note that the `props` keyword simply acts as an object:
```js
props = {
	name: 'Arto Hellas',
	age: 35
}
```
Thus, it makes sense that we can also pass our props by destructuring the `props` argument by one of the following two methods:
```js
// Way 1
const Hello = (props) => {
  const { name, age } = props
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

//Way 2 --> a better method as less verbose 
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

#### Page re-rendering
Imagine we wanted to implement a counter in React that updated its count view by 1 every time we clicked on a button. We could then implement the code in the following manner:
```js
// App.jsx
const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )
}

export default App

// main.jsx

import ReactDOM from 'react-dom/client'

import App from './App'

let counter += 1

ReactDOM.createRoot(document.getElementById('root')).render(
  <App counter={counter} />
)
```

However, the component won't re-render to show the updated count changes. To show these changes, we need the call the re-render ourselves:
```js
let counter = 1

const refresh = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App counter={counter} />
  )
}

refresh()
counter += 1
refresh()
counter += 1
refresh()

// refereshes every second
setInterval(() => {
  refresh()
  counter += 1
}, 1000)

```
However, this method of implementing re-rendering components is not preferred/

#### Stateful Components
Instead of re-rendering components manually, we can simply add state to our application.
Implementing state for the counter, our code now looks like:
```js
// main.jsx
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />) 

//App.jsx
import { useState } from 'react'

const App = () => {

  const [ counter, setCounter ] = useState(0)


  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

export default App
```

The keyword we use in React to implement state is called `useState`, which is imported using the line
```js
import { useState } from 'react';
```
Then, we define a useState set of variables in the following manner:
```js
const [counter, setCounter] = useState(0);
```
When defining state, we  write two variables in an array as  the useState *hook* returns two items in an array (which we have destructured and assigned to our own variables).
The naming convention for these two variables is usually: `something` and then `setSomething`. 
We then pass in a value in the `useState` keyword to specify the initial value of the state. In this case, it is 0, which makes sense for a counter.
`something` represents the current value of the state.
`doSomething` represents a function that modifies the value of the state and updates the `something` variable accordingly.

Finally, we call a `setTimeout` (built-into JS) function that periodically updates the count of our counter.
```js
setTimeout(
	() => setCounter(counter+1),
	1000
)
```
Every time the state changes due to the `setTimeout` function, React automatically re-renders the component.

#### Event Handling
Event handlers are registered to be called when specific events occur. For example, a specific event could be a click on a button by the user.
Here is a possible implementation of an event handler for a button click by the user:
```js
const App = () => {
  const [ counter, setCounter ] = useState(0)


  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <div>{counter}</div>

      <button onClick={handleClick}>
        plus
      </button>
    </div>
  )
}
```

We first implement a button click using a `handleClick` function. Then we pass it into the `onClick` attribute of the button we want to be clicked so that the function is executed upon a click. 
It is not necessary to name the function `handleClick`. We can name it anything else and it will still work. However the `onClick` attribute **cannot** be misspelled or forgotten for the click to work.
Alternatively, we can simply define our function within the `onClick` attribute:
```js
<button onClick={() => console.log('clicked')}>
	plus
</button>
```

However, remember we wanted to use our states to update the count on the screen rather than the console. Thus, we add the following adjustment:
```js
<button onClick={() => setCounter(counter + 1)}>
  plus
</button>
```

>[!abstract]- Possible Button to Reset Counter

```js
<button onClick={() => setCounter(0)}>         
	zero      
</button>
```

***NOTE:*** Event handlers should always be passed as functions into the event attributes of JSX elements. Otherwise, the React application will break.
***NOTE:*** Defining event handlers within JSX templates is not preferred. It is better to separate event handlers into separate functions and then reference those functions in the JSX template.
```js
const App = () => {
  const [ counter, setCounter ] = useState(0)


  const increaseByOne = () => setCounter(counter + 1)
  
  const setToZero = () => setCounter(0)

  return (
    <div>
      <div>{counter}</div>

      <button onClick={increaseByOne}>
        plus
      </button>

      <button onClick={setToZero}>
        zero
      </button>
    </div>
  )
}
```

#### Passing State to Child Components
>[!tip] It is recommended to write React components that are small and reusable across the application and even across projects.

Thus, we will refactor our application to make it be composed of three smaller components: one for the display of the counter and two for the buttons.

```js
// for displaying the counter
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

// for a general button that can take in any form of event handler and text
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
```
Note that we pass props to these components by referencing the props argument in the arrow functions and then using dot notation to access the objects we want.
Also note that our *Button* component is general in nature and thus reusable across different functionalities we might want a button to do.
We can now integrate these components into our *App* component. Since we are integrating the above components into another component, our *App* component, the *Display* and *Button* components are considered children of the *App* component.
```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)

  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>

      <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      />           
    </div>
  )
}
```

Firstly, note we pass in props to the children components by referencing the name of the prop and then assigning it a value. Here we pass the event handler method using the name `onClick` and the text of the button using the name `text`. The prop names are NOT important and could be renamed to anything else. However, it is best to follow conventions.

>[!info]- React Convention for Props Naming
>![[Pasted image 20231130102009.png]]

Secondly, note the value of the reusable *Button* component as we can now use the same component to achieve ***three*** different functionalities: increments, resets, and decrements.

#### Main Notes on State Changes
* When application starts, our App is executed.
	* The App uses a `useState` hook to create an application state for a counter, setting its initial value to 0.
	* The App component contains two different child components: one *Display* component to render the value of the counter and three *Button* components to change the state of the counter.
* When a button is clicked, the event handler for that button is executed, which changes the state of the App (or the counter variable) with the `setCounter` function.
* Calling a function that changes the state then causes the component to re-render as the event handler modifies the value of `counter` and the *App* component is re-rendered, causing the *Display* and *Button* components to be re-rendered too. 
	* The *Display* component receives the new counter value
	* The *Button* components receive event handlers to be able to change state of counter again if needed.

#### Using Destructuring
If we wanted, instead of passing the `props` keyword into our child components, we could simply use destructuring to simplify our components:
```js
// Display component
const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}

// Button component
const Button = ({ onSmash, text }) => (
  <button onClick={onSmash}>
    {text}
  </button>
)
```
