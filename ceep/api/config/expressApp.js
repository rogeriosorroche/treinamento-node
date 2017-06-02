const dotenv = require('dotenv');
const express = require('express');
const consign = require('consign');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const http = require('http');
const socketio = require('socket.io');

dotenv.config();

const app = express();
const port = 80;

app.set('view engine', 'ejs')
   .use(express.static(`${__dirname}/../public`))
   .use(bodyParser.urlencoded({extended: true}))
   .use(bodyParser.json())
   .use(helmet())
   .use(expressValidator());

consign()
   .include('infra')
   .then('dao')
   .then('controller')
   .then('routes')
   .into(app);

// tratamento de erros
app.use((err, req, res, next) => {
        if (err) {
           console.log(err);
           return res.render('error');
        }
        return next();
        })
    ;

// default handler
app.use((req, res, next) => {
        res.render('error');
    });  

// configuração de websockets
const server = http.createServer(app);
const io = socketio(server);
app.set('io', io);

io.on('connection', function (socket) {
  socket.on('okDoCliente', function (data) {
    console.log("Cliente recebeu mensagem: " + data);
  });
});

module.exports = {
    start: function() {
        server.listen(port, () => {
            console.log('Servidor iniciado na porta', port)
        });
        return this;
    }    
}