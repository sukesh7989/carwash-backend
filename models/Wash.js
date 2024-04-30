let mongoose = require("mongoose")

let  washSchema = mongoose.Schema({
    date:{
        type : Date,
        required : true
    },
    
    address :{
        type : String,
        required : true
    },

    customerId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Customer",
        required : true
    },
    number:{
        type : String,
        required : true
    },
    carnumber:{
        type : String,
        required : true
    },
    service:{
        type : String,
        require: true,
    },
    price:{
        type : String,
        require: true,  
    },
    time:{
        type : String,
        require: true,
    },
    carModel:{
        type : String,
        require: true, 
    }, 

})
let Wash = mongoose.model ("Wash" , washSchema)

module.exports = Wash;