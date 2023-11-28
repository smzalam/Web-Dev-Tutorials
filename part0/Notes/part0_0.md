## Part 0
### HTTP Get
* Server and web browser use HTTP Protocol to communicate with each other.
* *Network Tab* in Console of Dev Tools in Chrome shows how websites do HTTP Get method to get data
* HTTP Requests usually have headers
#### Dev Tools
##### Network Tab
###### Headers
	Headers contain information sent to and fro from client and server, containing information about data encoding, authentication, as well as other metadata required for requests

There are three types of Headers:
> [!info]- General Headers
> Shows information about HTTP Request sent by browser (client).
> May show information such as:
> * Request URL
> * Request Method
> * Status Code

> [!info]- Response Headers
> Shows information about the Response sent back by the server to the client.
> May show information such as:
> * Content-Length
> *  Content-Type
> * Server
> >[!abstract]- Content-Type Header
> A field in the header that contains information about how data going back to client is encoded.
> >>[!example]-
> >>![[Pasted image 20231127105021.png]]
> >>**Content-Type**  indicates how data is encoded in text form as HTML, notifying the browser to render the response as a web page.

> [!info]- Request Headers
> Shows information about HTTP Request sent by browser (client).
> May show information such as:
> * Request URL
> * Request Method
> * Status Code
###### Response Tab
Tab showing the response data.
![[Pasted image 20231127111239.png]]

This shows a sequence diagram visualizing how the browser and server communicate over time.
Even though it is difficult to notice, the HTML page begins to render before the image has been fetched from the server.

![[Pasted image 20231127113855.png]]

### Traditional Web Applications
Traditional web applications let the browser fetch the HTML document from the server.
	The document can be either static (saved into a server's directory) or dynamic (formed using application code such as a database or customer input). 

### Event Handlers and Callback Functions
#### Event Handlers
	A function that is called triggered due to a certain event.

>[!example]- 
>![[Pasted image 20231127134205.png]]
>Here, a function is called whenever the event  `onreadystatechange` occurs. The function then checks some application logic and executes code.

#### Callback Functions
	A function that is passed as a parameter to another function.

>[!example]- 
>![[Pasted image 20231127140204.png]]
>Here, `(req, res) => {...}` represents an arrow function passes as an argument to the function `app.get()`. 

#### Notes
Event handlers are often written as callback functions.
The functions are not invoked by application code but rater the runtime environment. That is, the browser invokes these functions as needed when the event has occured.

### Document Object Model (DOM)
HTML pages can be thought of as implicit tree structures.
The `Elements` tab in the Dev Console also represents the HTML structure as a tree.

>[!info]- DOM
>An Application Programming Interface (API) that enables programmatic modification of the _element trees_ corresponding to web pages.

You can create, add, remove, and do a variety of things to the structure of a HTML web page by calling the DOM API.

### Manipulating the Document Object from Console
>[!info]- Document Object
>The topmost node of the DOM tree in an HTML document is called the `document` object.

Accessing the document object gives us the ability to perform various operations on a webpage using the DOM API:
>[!info]-  Accessing document object
>Write the following in the console tab of the Dev Tools.
>```js
>document
>```

>[!info]- Getting an element from DOM using tag name
>Use the `getElementsByTagName` method:
>```js
>list = document.getElementsByTagName('ul')[0]
>```
>The $[0]$  returns the first instance of the `ul` tag in the results list.

>[!info]- Creating a new element
>Use the `createElement` method:
>```js
>newElement = document.createElement('li')
>```

>[!info]- Add text content to an element
>Use the `textContent` method on the element itself:
>```js
>newElement.textContent = 'Page manipulation from console is easy'
>```

>[!info]- Adding elements to the document
>Use the `appendChild` method:
>```js
>list.appendChild(newElement)
>```

NOTE: These changes are ***NOT*** permanent as these changes were not pushed to server.

### CSS
CSS stands for Cascading Style Sheets. It is a style sheet language used to determine the appearance of web pages. 
### Sequence Diagram of Page w/ JS Loading
![[Pasted image 20231127154501.png]]

### HTTP Post
A HTTP request used to post or put data onto a server.
Once a HTTP Post request is used, a status code of 302 is given as the server asks the browser to re-fetch the data that was modified so it can be re-rendered on the web page. 
A status code of 302 refers to a **URL Redirect**. 
HTTP Posts are usually done by sending data in forms.
Then the server can access that data by accessing the `req.body` field of the request object`req`.

### AJAX
AJAX stands for Asynchronous JavaScript and XML. It allowed a new way of fetching content to web pages using JavaScript included with XML without having to rerender the page. It makes use of the XMLHttpRequest().

Now, AJAX is used under the hood for more popular versions such as `fetch` or `axios` and has become more of an abstracted concept.

### Single Page App (SPA)

###### Traditional Web Page
A **traditional web page** involves having all of the JS logic on the server while the browser only renders the HTML of the page. You could also have some logic on the browser part that fires on certain events, but the primary function of the browser is to layout HTML.

###### SPA
A single page application has only one page comprised of HTML and the contents of that page changes through JavaScript logic executing in the browser. This means the pages aren't fetched separately from the server like traditional web pages.
