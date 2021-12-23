import express from "express";
import req from "express/lib/request";
import http from "http";
import  socketio  from "socket.io";

//// PARA INICIAR O SERVER BASTAR RODAR "npm run dev" NO TERMINAL

const app = express();

const server = http.Server(app);

const io = socketio(server);

io.on('connect', (socket) => {

io.to(socket.id).emit({
    status: true,
    message: "Conexão estabelecida com o servidor"
})

    socket.on('teste', (res) =>{
        console.log('Mensagem recebida',res);
        socket.broadcast.emit('teste', res)
    })
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index.html')
});

app.get('/teste', (req, res) => {
    res.send('teste')
});

server.listen(3333, () => {
    console.log('Servidor iniciando porta', 3333);
})
