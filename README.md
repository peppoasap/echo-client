# Echo Client

Echo Client is a client-side JS library to test WebSocket with Echo Messages.

## Installation

### Manual Download
Download the echo.js file and add it to your project folder.
[Download here](https://github.com/peppoasap/echo-client/blob/master/echo.js)
```html
<script src="echo.js"></script>
```

### Using NPM
Use the package manager [npm](https://www.npmjs.com/get-npm) to install Echo Client.

```js
npm install echo-client
```

You need to use Express Server to serve the file.
Add this line to your Express Server.

```js
app.use("/echo", express.static(__dirname + "/node_modules/echo-client"));
```
Next add it to your HTML.

```html
<script src="/echo/echo.js"></script>
```

## Usage

```js
//Create a Echo providing the WebSocket Echo Server URL
//This one is good - "wss://echo.websocket.org"
let echo = new Echo("wss://echo.websocket.org");

//Set the Callback to execute when receiving a message from the server. 
echo.whenReply((msg) => {
    console.log(msg.data);
});

//generate(object, n)
//This method send n messages with object as content to Echo Server
//You will receive the same messages.
echo.generate({hello: "Hello World!"}, 2);

//generateEverySecond(object, second, n)
//This method send n messages with object as content to Echo Server
//and repeat this every setted second/s.
echo.generateEverySecond({test: "I am looping every 1 second"}, 1, 5);

//Stop the generateEverySecond method if loop is running.
echo.stop();
```
### Version 1.0.0 - Under Construction

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
