const {Schema,model}=require('mongoose');

const WorkshopSchema=Schema({
    user:{
        type: Schema.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    create_at:{
        type:Date,
        default:Date.now
    }
})

module.exports=model("Workshop",WorkshopSchema,"workshops");