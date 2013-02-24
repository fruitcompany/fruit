Ext.define('GPAS.model.Path', {
    extend: 'Ext.data.Model',
    fields: ['id'],
    
    idProperty: 'id',
    proxy: {
        api : {
            create  : 'app/rest.php?_m=path&_verb=create',
            read    : 'app/rest.php?_m=path&_verb=read',
            update  : 'app/rest.php?_m=path&_verb=update',
            destroy : 'app/rest.php?_m=path&_verb=delete'    
        },
        type : 'ajax',
        reader : 'json'
    },
    hasMany : {model: 'GPAS.model.Class', name: 'classes' }
});
