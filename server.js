const express = require('express')
const http = require('http')
const soketio = require('socket.io')
const app = express();
const server = http.createServer(app);
const io = soketio(server);
const PORT = process.env.PORT || 5432
app.get('/favicon.ico', (req, res) => res.status(204));
app.use(('/'), express.static(__dirname + '/public'));
var voting_data = new Object();
io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('poll', (data) => {
        socket.join(data.pollId)
        voting_data[data.pollId] = data;
    })
    socket.on('endPoll', (data) => {
        delete voting_data[data.pollId];
    })
    socket.on('triger', (data) => {
        socket.emit('get_data', {
            voting_data: voting_data[data.pollId]
        })
    })
    socket.on('vote', (data) => {
        io.to(data.pollId).emit('vote_update', data)
    })

})
app.get('/data', (req, res) => {
    res.send(voting_data)
})
server.listen(PORT);
// const http = require("http");
// const port = process.env.port || 5432;
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader("content-type", 'text/html');
//     res.end('<h1> Hey node is running shuhhhh</h1>');
// })
// server.listen(port, function(args) {
//     console.log(`listening ${port}`);
// });