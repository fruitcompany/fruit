Ext.define('GPAS.view.InfoBox' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.infobox',

	bodyCls: 'gray-bg',

    layout: 'hbox',
	defaults: {padding: 5},
	width: 160,
	path: '',

	updateInfo: function(){
		var data = {
			units 	 : this.path.pathUnits,
			lastTerm : this.path.lastTerm,
			lastYear : this.path.lastYear,
			rank 	 : this.path.pathRec.get('Path_Rank')
		}
		this.down('panel').update(data);
		console.log("updating with", data);
		var button = Ext.getCmp('Save_Button');
		this.path.store.each(function(sem,a,b){
			var rt = true;
			console.log(sem,a,b);
			sem.classes().each(function(rec,a,b){
				console.log(rec,a,b);
				if(!rec.get('Available')){
					button.disable();
					button.setTooltip('Please fix any unavailable classes before saving.')
					rt = false;
					return false;
				}
				else if(button.isDisabled()){
					button.enable();
					button.clearTip();
				}
			});
			return rt;
		})
	},

	//updateRank: function(data){
	//	data.units = this.path.pathUnits;
	//	data.lastTerm = this.path.lastTerm;
	//	data.lastYear = this.path.lastYear;
	//	this.updateInfo(data);
	//},


    initComponent: function(){
		var me = this;

		me.items = [{
			xtype: 'panel',
			border: 0,
			padding: 10,
			layout: {
				type: 'auto',
				pack: 'right'
			},
			items: [{
				xtype: 'button',
				//text: 'X',
				iconCls: 'delete-img',
				action: 'remove_path',
				path: me.path
			},{
				xtype: 'button',
				//text: 'X',
				iconCls: 'arrow-up-img',
				action: 'move_path_up',
				path: me.path
			},{
				xtype: 'button',
				//text: 'X',
				iconCls: 'arrow-down-img',
				action: 'move_path_down',
				path: me.path
			}],

			tpl: new Ext.XTemplate(
				'<p><b><u>Computer Science</u></b><BR/>',
				'<b>Units:</b> {units}<BR/>',
				'<b>Rank:</b> {rank}<BR/>',
				'<b>Est. Graduation:</b><BR/>',
				'{lastTerm}	{lastYear}</p>'
			),
			bodyCls: 'gray-bg'
		}]

		this.callParent(arguments);
	}

});