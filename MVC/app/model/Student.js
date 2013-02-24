Ext.define('GPAS.model.Student', {
    extend: 'Ext.data.Model',
    fields: ['id', 'Student_ID', 'First_Name', 'Last_Name', 'User_Name', 'Password', 'Email'],
    
    validations: [
        {type: 'presence', field: 'User_Name'},
        {type: 'presence', field: 'Student_ID'},
        {type: 'presence', field: 'First_Name'},
        {type: 'presence', field: 'Last_Name'},
        {type: 'presence', field: 'Email'},
        {type: 'length', field: 'User_Name', min: 2},
        {type: 'format', field: 'Email', matcher: /[a-z]@[a-z].com/}
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
        reader : {
            type: 'json',
            root: 'students'
        }
    },
    hasMany: 'GPAS.model.Path'
});