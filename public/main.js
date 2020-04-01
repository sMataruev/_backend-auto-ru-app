'use strict';
( () => {
    document.querySelectorAll('.price').forEach(item =>{
         item.textContent = new Intl.NumberFormat( 'en-US', {
            style: "currency",
            currency: 'USD',
        } ).format(item.textContent );
    })
} )();
