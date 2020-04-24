'use strict';
const { Schema, model } = require( 'mongoose' );

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    cart: {
        item: [
            {
                carId: {
                   type: Schema.Types.ObjectId,
                   ref: 'Car',
                   required: true
                },
                count: {
                    type: Number,
                    default: 1
                }
            }
        ]
    }
});
userSchema.methods.addToCartItems = function(str) {
   return str + ' HELLO FROM METHODS';
};

userSchema.methods.removeFromCartItems = function() {

};

module.exports = model( 'User', userSchema );
