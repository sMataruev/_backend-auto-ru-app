'use strict';
const { Router } = require( 'express' );
const router = Router();
const Car = require( '../model/car' );

router.get( '/', async ( req, res ) => {
    const cars = await Car.find();
    res.status( 200 )
        .render( 'cars', {
            title: 'Car list',
            cars,
            isCar: true
        } );
} );

router.get( '/:id', async ( req, res ) => {
    const oneCar = await Car.findById( req.params.id );
    res.status( 200 )
        .render( 'car', {
            title: 'Показ одной машины',
            oneCar,
            isCar: true
        } )
} );

module.exports = router;
