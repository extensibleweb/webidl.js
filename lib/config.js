require.config({
    baseUrl: '/lib/',
    paths: {
        'deps': '/deps/',
        'WebIDL': '/lib/WebIDL'
    }
});

require(['WebIDL/types/Any', 'WebIDL/types/Boolean', 'WebIDL/types/Byte', 'WebIDL/types/ByteString', 'WebIDL/types/CallbackFunction', 'WebIDL/types/DOMString', 'WebIDL/types/Date', 'WebIDL/types/Double', 'WebIDL/types/Enumeration', 'WebIDL/types/Float', 'WebIDL/types/IDLType', 'WebIDL/types/Long', 'WebIDL/types/LongLong', 'WebIDL/types/Object', 'WebIDL/types/Octet', 'WebIDL/types/RegExp', 'WebIDL/types/Short', 'WebIDL/types/UnrestrictedDouble', 'WebIDL/types/UnrestrictedFloat', 'WebIDL/types/UnsignedLong', 'WebIDL/types/UnsignedShort']);