Ext.define('GPAS.view.PathManager' ,{
    extend: 'Ext.container.Viewport',
    alias : 'widget.pathman',
    layout: 'border',
    autoScroll:true,
    initComponent: function(){
        var me = this;
        //me.setLoading(true);
        //me.on('afterrender', function(){me.setLoading(false)});
        me.callParent();
    },
    items: [{
        xtype:'panel',
        //height: 100,
        region: 'north',
        html: '<img src="images/header.png" width="100%">'
        },{
        xtype:'panel',
        width: 100,
        region: 'west',
        html: 'This is where info on paths will go',
        items:[{
            xtype:'button',
            text:'Add Path',
            action:'add_path'
        },{
            xtype:'button',
            text:'test',
            action:'test'
        }]
    },{
        xtype: 'panel',
        region: 'center',
        autoScroll:true,
        items: {            	
            xtype: 'button',
            icon: 'images/add-icon.png',
            scale: 'large',
            action:'add_path'
        }
    }]
});