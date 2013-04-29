Ext.define('GPAS.store.Users', {
    extend: 'Ext.data.Store',
    fields: ['User_Name','Student_ID'],
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'app/rest.php?_m=student&_verb=getUnames',
        reader: {
            type: 'json',
            root: 'students',
            successProperty: 'success'
        }
    }
});