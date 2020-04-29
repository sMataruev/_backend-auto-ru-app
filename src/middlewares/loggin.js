'use strict';

module.exports = ( req, res, next ) => {
    res.locals.isLogged = req.session.isAuth;
    next()
};
