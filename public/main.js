const toCurrency = price => {
    return new Intl.NumberFormat ( 'en-US', {
        currency : 'usd',
        style : 'currency'
    } ).format ( price )
}


( () => {
    document.querySelectorAll ( '.price' ).forEach ( item => {
        item.textContent = toCurrency ( item.textContent )
    } );

    M.Tabs.init ( document.querySelectorAll ( '.tabs' ) )

    const toast = document.querySelector ( '.cr-toast' )
    setTimeout ( () => {
        new Promise ( ( resolve ) => {
            toast.style.transform = 'translateY(-50rem)'
            toast.style.opacity = '0'
            setTimeout ( () => {
                resolve ()
            }, 1000 )
        } )
            .then ( () => toast.remove () )
    }, toast.dataset.timeout )


} ) ()
