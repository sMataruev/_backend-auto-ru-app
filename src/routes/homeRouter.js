'use strict';
const { Router } = require( 'express' );
const router = Router();


router.get( '/', async ( req, res ) => {
    console.log( res.locals.isLogged );
    console.log('req.user____ ', req.user);
    console.log('req.user.session ____ ', req.session.user);
    res.status( 200 )
        .render( 'index', {
            title: 'Home',
            isHome: true
        } );

    //для промо машин,
    // const a = cars.filter(c => c.promo === true);
} );


module.exports = router;
