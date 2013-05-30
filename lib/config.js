require.config({
    baseUrl: '/lib/',
    paths: {
        'deps': '/deps/',
        'WebIDL': '/lib/'
    }
});
require(['WebIDL/types/Boolean', 'WebIDL/types/Double', 'WebIDL/types/Octet', 'WebIDL/types/Date', 'WebIDL/types/DOMString', 'WebIDL/types/Short', 'WebIDL/types/UnsignedShort', 'WebIDL/types/Object', 'WebIDL/types/Byte', 'WebIDL/types/Long', 'WebIDL/types/UnrestrictedDouble', 'WebIDL/types/ByteString', 'WebIDL/types/RegExp']);
