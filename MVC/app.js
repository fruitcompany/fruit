Ext.application({
    name: 'GPAS',
    
    controllers: [
        'Paths'
    ],

    appFolder: 'app',

    launch: function() {
    	Ext.create('Ext.container.Viewport', {
            layout: 'border',
            autoScroll:true,
	    items: [{xtype:'login',region:'center'}]
	});
// 		Ext.create('Ext.container.Viewport', {
//             layout: 'border',
//             autoScroll:true,
//             items: [{
//             	xtype:'panel',
// //             	width: 'fit',
//             	height: 100,
//             	region: 'north',
//             	html: 'This is the heading of the page'
//             },{
//             	xtype:'panel',
//             	width: 100,
// //             	height: 'fit',
//             	region: 'west',
//             	html: 'This is where info on paths will go',
//             	items:[{
//             		xtype:'button',
//             		text:'Add Path',
//             		action:'add_path'
//             	},{
//             		xtype:'button',
//             		text:'test',
//             		action:'test'
//             	}]
//             },{
//                 xtype: 'panel',
//                 region: 'center',
// //                 layout:'auto',
//             	autoScroll:true,
//             	items: {            	
// 					xtype: 'path',
// 				}
//             }]
//         });
    }
});