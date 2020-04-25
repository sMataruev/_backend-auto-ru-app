'use strict';
const { Router } = require( 'express' );
const router = Router();
const Order = require( '../model/order' );
const User = require( '../model/user' );
router.get( '/', async ( req, res ) => {
    const orders = await Order.findOne( { 'user.userId': req.user._id } )
        .populate( 'user.userId', '_id name' )
        .populate( 'cars.carId', 'brand price' );

    res.render( 'orders', {
        isOrder: true,
        title: 'Заказ',
        orders,
        sum: orders.cars.reduce( ( total, car ) => {
            return total += car.count * car.carId.price
        }, 0 ),
        qty: orders.cars.reduce( ( total, car ) => {
            return total += +car.count
        }, 0 )
    } )
} )
router.post( '/', async ( req, res ) => {
    try {
        const user = await User.findOne( { _id: req.user._id } )
            .populate( 'cart.items.carId' );

        const cars = user.cart.items.map( item => {
            const count = item.count;
            const carId = item.carId._id;
            item = { carId, count };
            return item
        } );

        const userId = { userId: req.user._id };
        const order = new Order( {
            cars,
            user: userId
        } );
        await order.save();
        res.send( 'Оформлен' )
    } catch ( e ) {
        console.log( e );
        res.json( { "err": '500' } )
    }

} );
// router.post( '/', async ( req, res ) => {
//     const user = await req.user.populate( 'cart.items.carId' ).execPopulate();
//
//     const cars = await user.cart.items.map(i => (
//         {
//             count: i.count,
//             cars: {...i.carId._doc}
//         }
//     ));
//
//     const order = new Order({
//         user: {
//             name: req.user.name,
//             userId: req.user._id
//         },
//         cars
//     });
//     await order.save();
//
//     res.redirect( '/orders' );
// } );

module.exports = router;

