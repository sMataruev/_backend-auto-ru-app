'use strict';
const { Schema, model } = require( 'mongoose' );

const userSchema = new Schema( {
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,

    },
    phoneNumber: {
        type: Number,
        required: true
    },
    cart: {
        items: [
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
} );
userSchema.methods.addToCartItems = function ( id ) {

    const items = [ ...this.cart.items ];
    const idx = ( items.findIndex( i => i.carId.toString() === id.toString() ) );

    if ( idx >= 0 ) {
        items[ idx ].count++
    } else {
        items.push( {
            carId: id
        } )
    }
    this.cart = { items };

    this.save()
};

userSchema.methods.removeFromCartItems = function (id) {
    const items = [ ...this.cart.items ];
    const idx = ( items.findIndex( i => i.carId.toString() === id.toString() ) )

    if ( idx >= 0 ) {
        const count = --items[ idx ].count;
        if ( count === 0 ) {
            items.splice( idx, 1 )
        }
    }
    this.cart = { items };

    this.save()
};

userSchema.methods.clearCartItems = function () {
    this.cart = { items: [] };
    this.save()
};

module.exports = model( 'User', userSchema );
