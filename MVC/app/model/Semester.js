Ext.define('GPAS.model.Semester', {
    extend: 'Ext.data.Model',
    fields: [
    	{ name : 'path_id', 	type : 'string' },
    	{ name : 'id', 	type : 'string' }
    ],
    idProperty: 'id',
    hasMany : {model: 'GPAS.model.Class', name: 'classes' }
});
