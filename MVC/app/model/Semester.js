Ext.define('GPAS.model.Semester', {
    extend: 'Ext.data.Model',
    fields: ['id', 'path_id','Year', 'Term'],
    idProperty: 'id',
    belongsTo: {model:'GPAS.model.Path', name:'Path'},
    hasMany : {model: 'GPAS.model.Class', name: 'classes' }
});
