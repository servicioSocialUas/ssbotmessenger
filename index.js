const express = require('express'); 
const bodyParser = require('body-parser');
const request = require('request');
var app = express();  // arrancamos el servidor
const config = require('./config');

app.use(bodyParser.json()); //definimos las req y res en json con body parser

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