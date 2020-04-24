'use strict';
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const blueBird = require( 'bluebird' );
const morgan = require( 'morgan' );
const mongoose = require( 'mongoose' );
const path = require( 'path' );
const config = require( './config' );
const cors = require( 'cors' );
const app = express();


const homeRouter = require( './routes/homeRouter' );
const carRouter = require( './routes/carRouter' );
const addCarRouter = require( './routes/addCarRouter' );
const cartRouter = require( './routes/cartRouter' );

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( cors() );
app.set( 'view engine', 'pug' );
app.set( 'views', path.resolve( __dirname, 'template', 'pages' ) );
app.use( express.static( path.resolve( process.cwd(), 'public' ) ) );

const User = require( '../src/model/user' );

async function addName(req, res, next) {

    const user = await User.findById( '5ea05c112510cb4030541eb8' );
    if ( !user ) {
        const user = new User({
            name: 'Alex',
            phoneNumber: 222222,
        });
        await user.save();
        req.user = user;
    }
    req.user = user;
    next();
}
app.use(addName);

app.use( '/', homeRouter );
app.use( '/cars', carRouter );
app.use( '/add', addCarRouter );
app.use( '/cart', cartRouter );


// Start DB and Server
const startServer = () => {

    app.listen( config.server.PORT );
    console.log( 'Server started' );
};
const connectToMongo = () => {
    mongoose.Promise = blueBird.Promise;
    mongoose.connect( config.dbPath, config.dbOption );
    console.log( 'Database started' );
    return mongoose.connection;
};

connectToMongo()
    .on( 'error', console.log )
    .on( 'disconnected', connectToMongo )
    .on( 'open', startServer );
