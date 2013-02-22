Ext.application({
    name: 'AM',
    
    controllers: [
        'Users'
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
            	html: 'this is a test',
            	items:{
            		xtype:'button',
            		handler:function(){
            			
            			console.log(this);
            		
            		}
            	}
            },{
            	xtype:'panel',
            	width: 100,
            	height: 'fit',
            	region: 'west',
            	html: 'this is a test'
            },{
                xtype: 'userlist',
                region: 'center'
                
            }]
        });
    }
});