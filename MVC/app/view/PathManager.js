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
        height: 180,
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
        layout:{
            type: 'auto',
            padding: 18
        },
        items: {            	
            xtype: 'button',
            text: "Add Path",
            //iconCls: 'add-icon',
            //scale: 'large',
            action:'add_path'
        }
    }]
});