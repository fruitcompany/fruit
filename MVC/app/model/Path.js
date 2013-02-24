Ext.define('GPAS.model.Path', {
    extend: 'Ext.data.Model',
    fields: ['id'],
    
    idProperty: 'id',
    proxy: {
        api : {
            create  : 'rest.php?_m=path&_verb=create',
            read    : 'rest.php?_m=path&_verb=read',
            update  : 'rest.php?_m=path&_verb=update',
            destroy : 'rest.php?_m=path&_verb=delete'    
        },
        type : 'ajax',
        reader : 'json'
    },
    hasMany : 'Classes'
});
