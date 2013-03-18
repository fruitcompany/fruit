Ext.define('GPAS.store.Student', {
    extend: 'Ext.data.Store',
    model: 'GPAS.model.Student',
    proxy: {
        api : {
            create  : 'app/rest.php?_m=student&_verb=create',
            read    : 'app/rest.php?_m=student&_verb=read',
            update  : 'app/rest.php?_m=student&_verb=update',
            destroy : 'app/rest.php?_m=student&_verb=delete'
        },
        type : 'ajax',
        reader : {
            type: 'json',
            root: 'students'
        }
    }
});