Ext.define('GPAS.model.Path', {
    extend: 'Ext.data.Model',
    fields: ['id'],
    
    hasMany: 'GPAS.model.Class'
});