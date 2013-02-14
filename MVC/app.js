Ext.application({
    name: 'GPAS',
    
    controllers: [
        'Paths'
    ],

    appFolder: 'app',

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [{
            	xtype:'panel',
            	width: 'fit',
            	height: 100,
            	region: 'north',
            	html: 'this is a test'
            },{
            	xtype:'panel',
            	width: 100,
            	height: 'fit',
            	region: 'west',
            	html: 'this is a test'
            },{
                xtype: 'panel',
                region: 'center',
                items: {
                	xtype: 'path'
                }
                
            }]
        });
    }
});