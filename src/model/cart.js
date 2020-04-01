'use strict';
const path = require( 'path' );
const fs = require( 'fs' );


const cartPath = path.resolve(
    process.cwd(),
    'DB',
    'cartDB.json'
);

class Cart {

    static async add( car ) {

    }

    static async delete( car ) {

    }

    static async getAllCars() {
        return new Promise( ( resolve, reject ) => {
            fs.readFile( cartPath, 'utf-8', ( err, content ) => {
                if(err) reject(err);

                resolve( JSON.parse( content ) );
            } );
        } );
    }

}


module.exports = Cart;
