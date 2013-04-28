Ext.define('GPAS.view.InfoBox' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.infobox',

	bodyCls: 'gray-bg',

    layout: 'hbox',
	defaults: {padding: 5},
	width: 150,


	items: [{
		xtype: 'panel',
		border: 0,

		tpl: new Ext.XTemplate(
			'<p><b><u>Computer Science</u></b><BR/>',
			'<b>Units:</b> {units}<BR/>',
			'<b>Rank:</b> {rank}<BR/>',
			'<b>Est. Graduation:</b><BR/>',
			'{lastTerm}	{lastYear}</p>'
		),
		bodyCls: 'gray-bg',
	},{
		xtype: 'panel',
		border: 0,
		padding: 10,
		items: [{
			xtype: 'button',
			//text: 'X',
			iconCls: 'delete-img',
			action: 'remove_path',
			path: ''
		},{
			xtype: 'button',
			//text: 'X',
			iconCls: 'delete-img',
			action: 'move_path_up',
			path: ''
		},{
			xtype: 'button',
			//text: 'X',
			iconCls: 'delete-img',
			action: 'move_path_down',
			path: ''
		}]
	}],

	updateInfo: function(data){
		this.down('panel').update(data);
		console.log("updating with", data);
	},


    initComponent: function(){

		this.callParent(arguments);
	}

});