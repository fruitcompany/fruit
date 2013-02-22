Ext.define('GPAS.model.Course', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'c_name', 	type: 'string',	mapping:'Class name'},
		{name: 'dept',  	type: 'string',	mapping:'Department'},
		{name: 'c_title',   type: 'string',	mapping:'Course Title'},
		{name: 'desc',  	type: 'string',	mapping:'Description'},
		{name: 'unit',  	type: 'number',	mapping:'Unit'},
		{name: 'type',  	type: 'string',	mapping:'Type'}
	]
});