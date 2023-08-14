const {Schema,model}=require('mongoose');

const UserSchema=Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true
    },
    create_at:{
        type:Date,
        default:Date.now
    }
})
module.exports =model("User",UserSchema,"users");