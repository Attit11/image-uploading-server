const mongoose = require('mongoose')


const Image = mongoose.model("Image", {
    image:{
        type: Buffer,
        required: true
    }
})

module.exports = Image