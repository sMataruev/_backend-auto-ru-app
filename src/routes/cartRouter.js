'use strict';
const { Router } = require( 'express' );
const router = Router();
const Cars = require( '../model/car' );

router.get( '/', async ( req, res ) => {
    const cars = await Cars.find();
    console.log(req.user);

    res.status( 200 )
        .render( 'cart', {
            isCart: true,
            title: 'CART',
            cars
        } );
} );

router.post( '/add', async ( req, res ) => {
    // const oneCar = await Cars.getOneCarById( req.body.id );
    // await Cart.add( oneCar );
    res.status( 200 )
        .redirect( '/cart' )
} );


module.exports = router;

