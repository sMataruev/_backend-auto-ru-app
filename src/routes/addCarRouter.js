'use strict';
const { Router } = require( 'express' );
const router = Router();
const Car = require( '../model/car' );

router
    .get( '/', ( req, res ) => {
        res.status( 200 )
            .render( 'addCars', {
                title: 'Add Car',
                isAdd: true,
            } );
    } )
    .post( '/', ( req, res ) => {
        res.status( 201 );
        const { year, distance, model, price, carImg } = req.body;
        const car = new Car( year, distance, model, price, carImg );
        car.save();

        res.redirect( '/cars' )
    } );


// C R U D
//Create
//Read
//Update
//Delete

module.exports = router;
