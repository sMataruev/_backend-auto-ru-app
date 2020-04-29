'use strict';
const { toast } = require( '../utils/toasts' );
const { Router } = require( 'express' );
const router = Router();
const User = require( '../model/user' );
const bcrypt = require( 'bcrypt' );

router.get( '/', async ( req, res ) => {
    res.render( 'auth', {
        title: 'Авторизация',
        isLogin: true,
        Warning: {
            ...toast( 'Error', 3000, 'Ошибка регистрации!' )
        }
    } )
} );

router.post( '/login', async ( req, res ) => {
    try {
        const { phoneNumber, password } = req.body;
        const user = await User.findOne( { 'phoneNumber': phoneNumber } );

        if ( user ) {
            // const confirmPass = password === user.password;
            const confirmPass = await bcrypt.compare( password, user.password );

            if ( confirmPass ) {
                req.session.isAuth = true;
                req.session.user = user;
                req.session.save( err => {
                    if ( err ) throw  err;

                    res.redirect( '/' );
                } );
            } else {
                res.redirect( '/auth' )
            }
        }
    } catch ( e ) {
        console.log( e );
    }


} );

router.get( '/logout', async ( req, res ) => {
    req.session.destroy( () => {
        res.redirect( '/auth' );
    } )
} );


router.post( '/register', async ( req, res ) => {
    try {
        const { name, phoneNumber, password, confirm } = req.body;
        const isUser = await User.findOne( { 'phoneNumber': phoneNumber } );

        if ( isUser ) {
            res.redirect( '/auth' )
        } else {
            const cryptPass = await bcrypt.hash( password,  12 );
            const user = new User( {
                name: name,
                password: cryptPass,
                phoneNumber,
                cart: { items: [] }
            } );
            await user.save();
            res.redirect( '/auth' );
        }
    } catch ( e ) {
        console.log( e );
    }

    // res.json( { 'ok': 'register' } )
} );

module.exports = router;
