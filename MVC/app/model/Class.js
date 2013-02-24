Ext.define('GPAS.model.Class', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'Class name', 	type: 'string' },
		{name: 'Department',  	type: 'string' },
		{name: 'Course Title', 	type: 'string' },
		{name: 'Description',  	type: 'string' },
		{name: 'Unit',  	type: 'number' },
		{name: 'Type',  	type: 'string' },
		{name: 'Year',  	type: 'number' },
		{name: 'Semester',  	type: 'string' },
		{name: 'Available',  	type: 'boolean' }
	]
});