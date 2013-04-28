var innerHTML = ([
    '<div id="container">',
      '<div id="masthead">',
          '<img alt="" height="152" src="images/fruit_cup_logo_white_text.jpg" width="180" />',
          '<p>IT Support (555) 555-5555</p>',
      '</div>',
      '<div id="navigation">',
          '<ul>',
              '<li><a href="index.html">Login</a></li>',
              '<li><a href="../account_manager/index.html">Schedule</a></li>',
              '<li><a href="faq/default.html">Help</a></li>',
              '<li><a href="admin_panel/default.html">Admin</a></li>',
          '</ul>',
      '</div>',
    '</div>'
]);

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
        html: innerHTML
    }
    //
    //,{
    //    xtype:'panel',
    //    width: 100,
    //    region: 'west',
    //    html: 'This is where info on paths will go',
    //    items:[{
    //        xtype:'button',
    //        text:'edit',
    //        action:'edit_path'
    //    },{
    //        xtype:'button',
    //        text:'Save',
    //        action:'save_path'
    //    }]
    //}
    ,{
        xtype: 'panel',
        region: 'center',
        autoScroll:true,
        tbar: [{
                xtype: 'button',
                text: "Add Path",
                //iconCls: 'add-icon',
                //scale: 'large',
                action:'add_path'
            },
            {
                xtype: 'button',
                text: 'Save Paths',
                action: "save_path"
            },
            {
                xtype: 'button',
                text: 'Cancel Edit',
                action: "cancel"
            }
        ],
        layout:{
            type: 'auto',
            padding: 18
        }
    }]
});
