Ext.define('GPAS.model.Class', {
    extend: 'Ext.data.Model',
    fields: ['id', 'Class_ID', 'Course_Name', 'Year', 'Term', 'Department', 'Course_Title', 'Description', 'Units', 'Type'],
    
    idProperty: 'id',
    proxy: {
        api : {
            create  : 'data/rest.php?_m=class&_verb=create',
            read    : 'data/rest.php?_m=class&_verb=read',
            update  : 'data/rest.php?_m=class&_verb=update',
            destroy : 'data/rest.php?_m=class&_verb=delete'    
        },
        type : 'ajax',
        reader : 'json'
    }
});