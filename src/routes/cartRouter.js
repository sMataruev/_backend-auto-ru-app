"use strict";
const secureRouts = require( '../middlewares/secureRouts' );
const { Router } = require( 'express' );
const router = Router();
const Cars = require( '../model/car' );
const User = require( '../model/user' );

router.get( '/', secureRouts, async ( req, res ) => {
    const user = await User.findOne( { _id: req.user._id } ).populate( 'cart.items.carId' );


    const cars = user.cart.items.map( item => {
        const count = item.count;
        item = { count, ...item.carId._doc };
        return item
    } );

    res.status( 200 )
        .render( 'cart', {
            title: 'Гараж',
            isCart: true,
            cars,
            sum: cars.reduce( ( total, car ) => {
                return total += car.count * car.price
            }, 0 ),
            qty: cars.reduce( ( total, car ) => {
                return total += +car.count
            }, 0 )
        } )
} );

router.post( '/add', secureRouts,  async ( req, res ) => {
    try {
        await req.user.addToCartItems( req.body.id );
        res.status( 200 )
            .redirect( '/cart' )
    } catch ( e ) {
        console.log( e );
    }
} )

router.post( '/rem', secureRouts, async ( req, res ) => {
    try {
        await req.user.removeFromCartItems( req.body.id )
        res.status( 200 )
            .redirect( '/cart' )
    } catch ( e ) {
        console.log( e );
    }
} );

module.exports = router;
