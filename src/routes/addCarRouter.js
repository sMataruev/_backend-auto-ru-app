'use strict';
const secureRouts = require( '../middlewares/secureRouts' );
const { Router } = require( 'express' );
const router = Router();
const Car = require( '../model/car' );


router
    .get( '/', secureRouts, async ( req, res ) => {

        res.status( 200 )
            .render( 'addCars', {
                title: 'Add Car',
                isAdd: true,
            } );
    } )
    .post( '/', secureRouts, async ( req, res ) => {

        const { year, distance, brand, price, carImg } = req.body;

        const car = new Car( {
            brand: brand,
            year: year,
            price: price,
            carImg: carImg,
            distance: distance,
            userId: req.user._id
        } );

        await car.save();
        res.status( 201 ).redirect( '/cars' )
    } );


// C R U D
// Create
// Read
// Update
// Delete

module.exports = router;
