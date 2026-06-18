// Import the http module
const http = require("http");

// Create a server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to the Node.js 4000 Tutorial");
});

// Listen on port 3000
server.listen(4000, () => {
    console.log(
        "Server is running on http://localhost:4000");
});