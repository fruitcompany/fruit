Ext.application({
    name: 'GPAS',
    controllers: [
        'Paths'
    ],
    appFolder: 'app',
    launch: function () {
        Ext.create('GPAS.view.Login', {
            layout: 'border',
            autoScroll: true,
        });
    }
});