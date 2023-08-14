const mongoose =require('mongoose');
const connection=async()=>{
    try{
        await mongoose.connect("mongodb+srv://1524:1524@cluster0.im2b5ws.mongodb.net/talleres_vehiculares");
        //await mongoose.connect("mongodb://127.0.0.1:27017/talleres_vehiculares");
        console.log("Base de datos conectada");
    }catch(error){
        console.log(error);
        throw new Error("No se pudo conectar a la base de datos");
    }
}
module.exports={
    connection
}