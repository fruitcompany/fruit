Ext.define('GPAS.model.Semester', {
    extend: 'Ext.data.Model',
    fields: ['id'],
    idProperty: 'id',
    hasMany : {model: 'GPAS.model.Class', name: 'classes' }
});
