  
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     firstName: {
      type: String,
      required: true
    }, 
     lastName:{
      type:String,
      required: true
     },
     email: { 
      type: String, 
      required: true, 
      unique: true 
     },
     password: { 
      type: String, 
      required: true, 
      minlength: 6 
    },
     address: {
        type: String,
        required: true
     },
     phone: {
         type: Number,
         required: true
     },
     lat: {
       type: Number,
       default: 0
     },
     lng: {
        type: Number,
        default: 0
     }

});

module.exports = User = mongoose.model("user", userSchema);