Ext.define('GPAS.model.Class', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'c_name', 	type: 'string' },
		{name: 'dept',  	type: 'string' },
		{name: 'c_title',   	type: 'string' },
		{name: 'desc',  	type: 'string' },
		{name: 'unit',  	type: 'number' },
		{name: 'type',  	type: 'string' },
		{name: 'year',  	type: 'number' },
		{name: 'semester',  	type: 'string' },
		{name: 'avail',  	type: 'string' }
	]
});