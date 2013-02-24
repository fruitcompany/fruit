Ext.define('GPAS.model.User', {
    extend: 'Ext.data.Model',
    fields: ['s_id', 'fname', 'lname', 'username', 'password', 'email'],
    
    validations: [
        {type: 'presence', field: 'username'},
	{type: 'presence', field: 's_id'},
	{type: 'presence', field: 'fname'},
	{type: 'presence', field: 'lname'},
	{type: 'presence', field: 'email'},
        {type: 'length', field: 'username', min: 2},
        {type: 'format', field: 'email', matcher: /[a-z]@[a-z].com/}
    ],
    
    proxy: {
        type: 'rest',
        url : 'rest.php'
    },
    
    hasMany: 'GPAS.model.Paths'
});