'use strict';
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const blueBird = require( 'bluebird' );
const morgan = require( 'morgan' );
const mongoose = require( 'mongoose' );
const path = require( 'path' );
const config = require( './config' );
const cookieParser = require( 'cookie-parser' );
const session = require( 'express-session' );
const mongoSession = require( 'connect-mongodb-session' )( session );
const app = express();

const mongoStore = new mongoSession( {
    collection: 'sessions',
    uri: config.dbPath
} );

const homeRouter = require( './routes/homeRouter' );
const carRouter = require( './routes/carRouter' );
const addCarRouter = require( './routes/addCarRouter' );
const cartRouter = require( './routes/cartRouter' );
const orderRouter = require( './routes/orders' );
const authRouter = require( './routes/auth' );


app.use( cookieParser() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.set( 'view engine', 'pug' );
app.set( 'views', path.resolve( __dirname, 'template', 'pages' ) );
app.use( express.static( path.resolve( process.cwd(), 'public' ) ) );
app.use( session( {
    secret: 'secretkey' + secretKey(),
    resave: false,
    saveUninitialized: false,
    mongoStore
} ) );
const User = require( '../src/model/user' );

async function addName( req, res, next ) {
    const user = await User.findById( '5ea44969a849663d287738ad' );
    if ( !user ) {
        const user = new User( {
            name: 'Alex',
            phoneNumber: 222222,
        } );
        await user.save();
        req.user = user;
    }
    req.user = user;
    next();
}

app.use( addName );

app.use( '/', homeRouter );
app.use( '/cars', carRouter );
app.use( '/add', addCarRouter );
app.use( '/cart', cartRouter );
app.use( '/orders', orderRouter );
app.use( '/auth', authRouter );


//secret for session key
function secretKey() {
    return ( Math.random() + 31 + 11 ).toString();
}

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
