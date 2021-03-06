Ext.define('GPAS.model.Path', {
    extend: 'Ext.data.Model',
    fields: ['id', 'Path_Rank'],

    idProperty: 'id',
    proxy: {
        api : {
            create  : 'app/rest.php?_m=path&_verb=create',
            read    : 'app/rest.php?_m=path&_verb=read',
            update  : 'app/rest.php?_m=path&_verb=update',
            destroy : 'app/rest.php?_m=path&_verb=delete'
        },
        type : 'ajax',
        reader : {
            type : 'json',
            root : 'paths'
        },
        writer: new Ext.data.writer.Json( {
            type: 'json',
            writeAllFields: true,
            root: 'path'
        })
    },
    belongsTo: {model:'GPAS.model.Student', getterName:'Student'},
    hasMany : {model: 'GPAS.model.Semester', name: 'semesters' }
});
