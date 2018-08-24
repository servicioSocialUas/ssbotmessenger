const express = require('express'); 
const bodyParser = require('body-parser');
const request = require('request');
const morgan = require('morgan');
var app = express();  // arrancamos el servidor
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //para enterder los datos que envian los clientes en formato json
app.use(morgan('dev')); //que utilice morgan en su configuracion de desarrollo

app.listen(config.port, ()=>{
    console.log('El servidor se encuentra en http://localhost:3000');
}); 

app.get('/',(req,res)=>{
    res.status(200).send({message:'Bienvenido al servidor'});
});


app.get('/webhook',(req,res)=>{
   //le enviamos a fb el token para que nos responda en challenge
   if(req.query['hub.verify_token'] === config.token_bot){
       //si es fb quien nos envia el token correcto le respondemos con el challenge que el nos envia
       res.send(req.query['hub.challenge'])
   }else{
       res.status(500).send({message:'Ftatal, token incorrecto'});
   }
});

app.post('/webhook',(req,res)=>{
    var data = req.body; 
    console.log(data);
})