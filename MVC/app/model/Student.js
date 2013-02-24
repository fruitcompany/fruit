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
            create  : 'rest.php?_m=student&_verb=create',
            read    : 'rest.php?_m=student&_verb=read',
            update  : 'rest.php?_m=student&_verb=update',
            destroy : 'rest.php?_m=student&_verb=delete'    
        },
        type : 'ajax',
        reader : 'json'
    }
});