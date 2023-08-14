const {connection}=require('./database/connection');
const express=require('express');
const cors=require('cors');

//mensaje de bienvenida
console.log("Bienvenido");

//conexion a la bbdd
connection();

//crear servidor node
const app=express();
const puerto=3900;

//configurar cors
app.use(cors()); //esto se ejecutará antes de todo

//todos los datos que me lleguen tengo que convertirlo a json
app.use(express.json());
app.use(express.urlencoded({extended:true}));//cualquier date que me llegue en formato form-urlencoded me lo covertira a js

//rutas
/////////////////////
///config rutas//
//user//
const userRoutes=require("./routes/user")
app.use("/api/user",userRoutes);
///workshop
const workshopRoutes=require("./routes/workshop")
app.use("/api/workshop",workshopRoutes);
//comment
const commentRoutes=require("./routes/comment")
app.use("/api/comment",commentRoutes);

/////////

//poner servidor a escuchar peticionesh http
app.listen(puerto,()=>{
    console.log("servidor de node corriendo en el puerto ",puerto);
});