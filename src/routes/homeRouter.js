'use strict';
const { Router } = require( 'express' );
const router = Router();
const User = require( '../model/user' );


router.get( '/', async ( req, res ) => {

    const f = await req.user.addToCartItems( 'fff ' );
    console.log(f);


    res.status( 200 )
        .render( 'index', {
            title: 'Home',
            isHome: true
        } );

    //для промо машин,
    // const a = cars.filter(c => c.promo === true);
} );


module.exports = router;
