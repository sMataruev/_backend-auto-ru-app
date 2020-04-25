'use strict';
const { Router } = require( 'express' );
const router = Router();
const User = require( '../model/user' );

const Car = require( '../model/car' );

router.get( '/', async ( req, res ) => {

    console.log( req.session.isAuth );

    const car = await Car.find( {_id: '5ea4468ac6175a4640654b59'} );

    console.log('CAR - >', car);


    res.status( 200 )
        .render( 'index', {
            title: 'Home',
            isHome: true
        } );

    //для промо машин,
    // const a = cars.filter(c => c.promo === true);
} );


module.exports = router;
