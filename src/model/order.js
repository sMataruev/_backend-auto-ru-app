'use strict';
const { Schema, model } = require( 'mongoose' );

// const orderShema = new Schema({
//     cars: [
//         {
//             car: {
//                 type: Object,
//             },
//             count: {
//                 type: Number,
//                 required: true
//             }
//         }
//     ],
//     user: {
//         name: {
//             type: String,
//             required: true
//         },
//         userId: {
//             type: Schema.Types.ObjectId,
//             ref: 'User',
//             required: true
//         }
//     }
// });
const orderSchema = new Schema ( {
    cars : [
        {
            carId : {
                type : Schema.Types.ObjectId,
                ref : 'Car',
                required : true
            },
            count : {
                type : Number,
                required : true
            }
        }
    ],
    user : {
        userId : {
            type : Schema.Types.ObjectId,
            ref : 'User',
            required : true
        }
    }
} )
module.exports = model( 'Order', orderSchema );
