require.config({
    baseUrl: '/lib/',
    paths: {
        "deps": "/deps/"
    }
});
require(['types/Boolean',
         'types/Double',
         'types/Octet',
         'types/Date',
         'types/DOMString',
         'types/Short', 
         'types/UnsignedShort',
         'types/Object',
         'types/Byte',
         'types/Long',
         'types/UnrestrictedDouble']);
