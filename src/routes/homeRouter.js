'use strict';
const { Router } = require( 'express' );
const router = Router();


router.get( '/', ( req, res ) => {
    res.status( 200 )
        .render( 'index', {
            title: 'Home',
            isHome: true
        } );
} );


module.exports = router;
