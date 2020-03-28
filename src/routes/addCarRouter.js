'use strict';
const { Router } = require( 'express' );
const router = Router();


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
        const { model, price, link } = req.body;
        console.log( model );
        console.log( price );
        console.log( link );
        res.redirect('/cars')
    } );

// C R U D
//Create
//Read
//Update
//Delete

module.exports = router;
