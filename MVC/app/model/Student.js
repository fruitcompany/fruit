Ext.define('GPAS.model.Student', {
    extend: 'Ext.data.Model',

    fields : [
        { name: 'id',           convert: function(val,model){ return model.get('Student_ID');}},
        { name:  'Student_ID',  type: 'number'},
        { name:  'First_Name',  type: 'string'},
        { name:  'Last_Name',   type: 'string'},
        { name:  'User_Name',   type: 'string'},
        { name:  'Password',    type: 'string'},
        { name:  'Email',       type: 'string'}
    ],

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
        },
        writer: new Ext.data.writer.Json( {
            type: 'json',
            writeAllFields: true,
            root: 'paths'
        })
    },
    hasMany : {model: 'GPAS.model.Path', name: 'paths'}
});