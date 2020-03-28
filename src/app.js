'use strict';
const express = require( 'express' );
const path = require( 'path' );
const morgan = require( 'morgan' );
const app = express();

const homeRouter = require( './routes/homeRouter' );
const carRouter = require( './routes/carRouter' );
const addCarRouter = require( './routes/addCarRouter' );

app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );

app.set( 'view engine', 'pug' );
app.set( 'views', path.resolve( __dirname, 'template', 'pages' ) );
app.use( express.static( path.resolve( process.cwd(), 'public', 'css' ) ) );

app.use( '/', homeRouter );
app.use( '/cars', carRouter );
app.use( '/add', addCarRouter );

const PORT = process.env.PORT || 5000;
app.listen( PORT, () => {
    console.log( 'Server is work' );
} );
