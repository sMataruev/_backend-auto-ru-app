'use strict';
const { Router } = require( 'express' );
const router = Router();
const Car = require( '../model/car' );

router.get( '/', async ( req, res ) => {
    const cars = await Car.getAllCars();

    res.status( 200 )
        .render( 'cars', {
            title: 'Car list',
            cars,
            isCar: true
        } );
} );


module.exports = router;
