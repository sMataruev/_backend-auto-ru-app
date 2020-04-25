'use strict';
const { toast } = require( '../utils/toasts' );
const { Router } = require( 'express' );
const router = Router();
const User = require( '../model/user' );
// router.get( '/', ( ( req, res ) => {
//     res.render('auth', {
//         title: 'Авторизация',
//         isLogin: true
//     })
// } ) );

router.get ( '/', ( req, res ) => {
    res.render ( 'auth', {
        title : 'Авторизация',
        isHome : true,
        Warning : {
            ...toast ( 'Error', 3000, 'Ошибка регистрации!' )
        }
    } )
} );

router.post( '/register', async ( req, res ) => {
    req.session.user = await User.findById( '5ea44969a849663d287738ad' );
    req.session.isAuth = true;

    req.session.save(err => {
        if (err) throw err;

        res.send('OK')
    });
} );
module.exports = router;
