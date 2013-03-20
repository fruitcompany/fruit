Ext.define('GPAS.model.Class', {
    extend: 'Ext.data.Model',
    fields: [
		{ name : 'id',	        type : 'string', convert: function(val,model){ return model.get('Class_ID');}},
		{ name : 'path_id', 	type : 'string' },
		{ name : 'Class_ID',    type : 'number' },
		{ name : 'Course_Name', type : 'string' },
		{ name : 'Year',	type : 'number' },
		{ name : 'Term',        type : 'string' },
		{ name : 'Department',  type : 'string' },
		{ name : 'Course_Title',type : 'string' },
		{ name : 'Description', type : 'string' },
		{ name : 'Units', 	type : 'number' },
		{ name : 'Type', 	type : 'string' }
    ],

    idProperty: 'id',
    proxy: {
        api : {
            create  : 'app/rest.php?_m=class&_verb=create',
            read    : 'app/rest.php?_m=class&_verb=read',
            update  : 'app/rest.php?_m=class&_verb=update',
            destroy : 'app/rest.php?_m=class&_verb=delete'
        },
        type : 'ajax',
        reader : {
			type : 'json',
			root : 'classes'
		}
    },
	belongsTo: {model:'GPAS.model.Semester', getterName:'Semester'}
});