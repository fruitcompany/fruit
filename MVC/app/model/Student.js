Ext.define('GPAS.model.Student', {
    extend: 'Ext.data.Model',
    fields: ['id', 's_id', 'fname', 'lname', 'username', 'password', 'email'],
    
    validations: [
        {type: 'presence', field: 'username'},
        {type: 'presence', field: 's_id'},
        {type: 'presence', field: 'fname'},
        {type: 'presence', field: 'lname'},
        {type: 'presence', field: 'email'},
        {type: 'length', field: 'username', min: 2},
        {type: 'format', field: 'email', matcher: /[a-z]@[a-z].com/}
    ],
    idProperty: 'id',
    proxy: {
        api : {
            create  : 'data/rest.php?_m=student&_verb=create',
            read    : 'data/rest.php?_m=student&_verb=read',
            update  : 'data/rest.php?_m=student&_verb=update',
            destroy : 'data/rest.php?_m=student&_verb=delete'    
        },
        type : 'ajax',
        reader : 'json'
    }
});