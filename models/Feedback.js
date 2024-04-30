const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
   
    value:{
        type: String,
        required: true,
    },
    pro:{
        type: Array,
        required: true,
    },
    feedback:{
        type: String,
        required: true,
    }
    


});

const feedback = mongoose.model('feedback', customerSchema);

module.exports = feedback;