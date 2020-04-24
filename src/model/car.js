"use strict";
const { Schema, model } = require( 'mongoose' );

const carSchema = new Schema( {
    brand: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1995,
        max: 2020
    },
    price: {
        type: Number,
    },
    carImg: String,
    distance: Number,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
} );

module.exports = model( 'Car', carSchema );
