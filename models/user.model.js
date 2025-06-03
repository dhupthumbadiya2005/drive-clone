const e = require('express');
const mongoose = require('mongoose') ; 

const userSchema = new mongoose.Schema({
    username : { 
        type : String , 
        required : true , 
        unique : true , 
        trim : true , 
        minlength : [4, 'Username must be at least 4 characters long']
    } , 
    
    email : {
        type : String , 
        required : true , 
        unique : true , 
        trim : true , 
        minlength : [13, 'Email must be at least 13 characters long'],
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password : {
        type : String , 
        required : true , 
        trim : true , 
        minlength : [4, 'Password must be at least 4 characters long']
    }
})

const User = mongoose.model('User', userSchema) ;

module.exports = User ;