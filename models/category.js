const mongoose = require('mongoose')
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength:32,
        unique: true
    }
},
{timestamps:true}
);



module.exports = mongoose.model("Category",categorySchema);