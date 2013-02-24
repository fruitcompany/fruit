Ext.define('GPAS.model.Path', {
    extend: 'Ext.data.Model',
    fields: ['id'],
    
    idProperty: 'id',
    proxy: {
        api : {
            create  : 'data/rest.php?_m=path&_verb=create',
            read    : 'data/rest.php?_m=path&_verb=read',
            update  : 'data/rest.php?_m=path&_verb=update',
            destroy : 'data/rest.php?_m=path&_verb=delete'    
        },
        type : 'ajax',
        reader : 'json'
    },
    hasMany : 'Classes'
});
