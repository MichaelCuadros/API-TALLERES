//importar dependencias
const jwt =require('jwt-simple');
const moment=require('moment'); 

//clave secreta
const secret_key="clave_secreta";

//crear una funcion para generar tokens
const createToken=(user)=>{
    const payload={
        _id:user._id,
        name:user.name,
        username:user.username,
        iat:moment().unix(),//momento en el q se crea
        exp:moment().add(1,"days").unix()//fecha de vencimiento 
    }

    //devolver jwt token codificado
    return jwt.encode(payload,secret_key);
}

module.exports={
    secret_key,
    createToken
}