const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchma = new Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    phone : {
        type : Number
    },
    password : {
        type : String
    },
    role : {
        type : String,
        enum : ['admin','view','add','edit'],
        default : "view"
    },
    recentOrders : [{
        menu : [  
            {
                item : {
                    type : String
                },
                price : {
                    type : Number
                },
                count : {
                    type : Number
                }
            },
        ],
        orderId : {
            type : String
        },
        restroDetails : {
            
        },
        date : {
            type : Date
        }
    }]
})

const userModel = mongoose.model('userModel',userSchma);
module.exports = userModel;
