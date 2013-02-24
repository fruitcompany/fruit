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
            create  : 'app/rest.php?_m=student&_verb=create',
            read    : 'app/rest.php?_m=student&_verb=read',
            update  : 'app/rest.php?_m=student&_verb=update',
            destroy : 'app/rest.php?_m=student&_verb=delete'    
        },
        type : 'ajax',
        reader : 'json'
    }
});