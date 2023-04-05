const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    //mongoose中的验证功能
    content:{
      type:String,
      // minLength:5,
      required:true
    },
    date:{
      type:Date,
      required:true
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    username:{
      type:String,
      ref:'User'
    }
  });
  
  // 修改模式中的toJSON的方法
  messageSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });
  
  const Message = mongoose.model("Message", messageSchema);
  
  module.exports = Message;