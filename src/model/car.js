'use strict';
const uuid4 = require( 'uuid/v4' );
const path = require( 'path' );
const fs = require( 'fs' );

class Car {
    constructor( year, distance, model, price, carImg ) {
        this.id = uuid4();
        this.year = year;
        this.distance = distance;
        this.model = model;
        this.price = price;
        this.carImg = carImg;
    }

    //Сохраняем в JSON формат
    jsObjSave() {
        return {
            id: this.id,
            year: this.year,
            distance: this.distance,
            model: this.model,
            price: this.price,
            carImg: this.carImg
        }
    }

    //Берем все машины из базы
    static getAllCars() {
        return new Promise( ( resolve, reject ) => {
            fs.readFile(
                path.resolve( process.cwd(), 'DB', 'DBCars.json' ),
                'UTF-8',
                ( err, content ) => {
                    if ( err ) reject( err );

                    resolve( JSON.parse( content ) );
                } );
        } )

    }

    //Сохранение одной машины
    async save() {
        const allCars = await Car.getAllCars();
        allCars.push( this.jsObjSave() );
        const jsonCar = JSON.stringify( allCars );

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.resolve( process.cwd(), 'DB', 'DBCars.json' ),
                jsonCar,
                ( err ) => {
                    if ( err ) reject( err );

                    resolve();
                } );
        })

    }

}

module.exports = Car;
