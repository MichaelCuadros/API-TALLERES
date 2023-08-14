const {Schema,model}=require('mongoose');

const CommentSchema=Schema({
    user:{
        type:Schema.ObjectId,
        ref:"User"
    },
    workshop:{
        type:Schema.ObjectId,
        ref:"Workshop"
    },
    text:String,
    create_at:{
        type:Date,
        default:Date.now
    },
    calification:Number
})

module.exports=model("Comment",CommentSchema,"comments");