'use strict';
const { Router } = require( 'express' );
const router = Router();


router.get( '/', ( req, res ) => {
    res.status( 200 )
        .render( 'cars', {
            title: 'Cars',
            isCar: true
        } );
} );


module.exports = router;
