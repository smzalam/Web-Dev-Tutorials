### JavaScript
#### Variables
There are three keywords to *define* a variable in JavaScript:
* var
	* defines a variable
	* has scope throughout entire program/file
* let
	* defines a variable
	* has scope throughout the block of code it is defined in
* const
	* does not *define* a variable but initializes it with a constant value that can no longer be changed

>[!example]- Examples of Variables and Keywords
>```js
>const x = 1
>let y = 5
>
>console.log(x, y)   // 1, 5 are printed
>y += 10
>console.log(x, y)   // 1, 15 are printed
>y = 'sometext'
>console.log(x, y)   // 1, sometext are printed
>x = 4               // causes an error
>```

#### Arrays
An array is simply a list of items defined as such: `const l = [1,2,-1, 3]`. 
One thing to note is that even though the array is defined as a `const`. the values of its items **CAN** change. However, the variable `l` itself **CANNOT** point to another list.

###### Some common and important Array methods

```js
const t = [1, -1, 3]

// Adding an item to the array
t.push(5)

// Printing the lenght of the array
console.log(t.length) // 4 is printed
// Printing a particular item by its index in the list
console.log(t[1])     // -1 is printed

// Iterating over each item in the list using the `forEach` method
// The `forEach` method recieves a callback function that is called for each item in the list
// The function gets the value of the item and then prints the value
t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each on its own line
})                    

// Functional Programming Way of adding items to list using the `concat` method
// Creates a copy of the original list with the added items
// Preserves **immutability**
const t2 = t.concat(5) // creates a new array
console.log(t) // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed
```

###### Array Map Method
The array `map` method goes over the specified array, creates a new array based on the old array, and then applies modifications on those elements based on a specified callback function passes as an argument to the `map` method.
Here are some examples on what the map method can achieve:
>[!example]- Example 1: Modifying values of array
>Here a new array is created with each item being multiplied by 2 of its original value:
>```js
>const t = [1, 2, 3]
>const m1 = t.map(value => value * 2)
>console.log(m1)   // [2, 4, 6] is printed
>```

>[!example]- Example 2: Generating HTML Strings
>Here  a list element in HTML is created with the text of the list element being the item of the original array:
>```js
>const m2 = t.map(value => '<li>' + value + '</li>')
>console.log(m2)  
>// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed
>```

###### Destructuring Assignment
We can destructure individual items of an array and assign them to variables:
```js
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1, 2 is printed
console.log(rest)          // [3, 4, 5] is printed
```
Here, we get `first` and `second` as variables containing the value of the first two list items while the remaining items are grouped into the variable `rest`.

#### Objects
We can define objects in JavaScript using object literals, which is by listing its properties within braces:
```js
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}

const object2 = {
  name: 'Full Stack web application development',
  level: 'intermediate studies',
  size: 5,
}

const object3 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
}
```
As visible, the properties can be of any type, i.e. they can be integers, strings, arrays, and even objects themselves.

We can reference the properties of an object by using dot notation or bracket notation:
```js
console.log(object1.name)         // Arto Hellas is printed
const fieldName = 'age' 
console.log(object1[fieldName])    // 35 is printed
```

We can add properties to objects by using either dot notation or bracket notation. When we want to add a new property that has spaces, we use bracket  notation.
```js
object1.address = 'Helsinki'
object1['secret number'] = 12341
```

#### Functions
We define arrows functions as:
```js
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}

const result = sum(1, 5)
console.log(result)
```

However, if there is only a single parameter, we can exclude the parentheses:
```js
const square = p => {
  console.log(p)
  return p * p
}
```

If the function has only a single expression, we can even remove the brackets:
```js
const square = p => p * p

// The above example is particularly useful when using mapping methods
const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
// tSquared is now [1, 4, 9]
```

Before arrow functions, we utilized the keyword `function` to define functions, of which there were two ways:
```js
// Way 1 --> giving function declaration
function product(a, b) {
  return a * b
}

//Way 2 --> using fuction expression, can exist amongst other code
const average = function(a, b) {
  return (a + b) / 2
}

const result = product(2, 6)
// result is now 12
const result = average(2, 5)
// result is now 3.5
```


#### Object Methods And 'This'
	Not Covered as Not Important
	Read on own time
#### Classes
	Not Covered as Not Important for React
	Read on own time