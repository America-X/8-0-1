const gifs = require('./gifs.json');
const express = require('express');
// 1. Import Path
const path = require('path')

// 2. Define a path to the dist folder

const app = express();
const pathToDistFolder = path.join(__dirname, '../vite-project/dist')
console.log(pathToDistFolder)

const serverStatic = express.static(pathToDistFolder)

//dirname is our currently location: index.js(server-start), refers to parent directory

/////////////////////
// Controllers
/////////////////////

// 3. Create the logRoutes middleware

//Middleware takes in the request and hands it off to someone else, 
//kinda of like a mailman gets the mail and send it to someone else

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  // variable holding the time
  const time = new Date().toLocaleString();
  // info we are getting from the request along with the time
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  //m move to the next controller
  next(); // Passes the request to the next middleware/controller
};

// 4. Create the serveStatic middleware


// "Response" controllers send data to the client
const serveData = (req, res, next) => res.send(gifs);
const serveHello = (req, res, next) => {
  const name = req.query.name || "stranger";
  res.send(`hello ${name}`);
}

////////////////////////
// Routes
////////////////////////

// 5. Use both middleware

app.use(logRoutes)

app.get('/api/hello', serveHello);
app.get('/api/data', serveData);
app.use(serverStatic)


const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});