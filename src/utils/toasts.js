'use strict';


exports.toast = ( msgType, msgTimeout, msgText ) => {
    let msgClass = ['cr-toast']
    switch ( msgType ) {
        case 'Warning':
            msgClass.push ( 'lime lighten-4' )
            break
        case 'Information':
            msgClass.push ( 'teal accent-1' )
            break
        case 'Error':
            msgClass.push ( 'red accent-1' )
            break
    }
    return {
        isMsg : true,
        msgClass : msgClass.join ( ' ' ),
        msgTimeout : msgTimeout,
        msgText : msgText
    }
}
