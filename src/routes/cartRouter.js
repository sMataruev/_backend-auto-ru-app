'use strict';
const { Router } = require( 'express' );
const router = Router();
const Cart = require( '../model/cart' );

router.get( '/', async ( req, res ) => {
    res.status( 200 )
        .render( 'cart', {
            isCart: true
        } );
} );
router.post( '/add', async ( req, res ) => {
    const cars = await Cart.getAllCars();
    res.status( 200 )
        .render( 'cart', {
            title: 'Cart',
            cars
        } )
} );


module.exports = router;

