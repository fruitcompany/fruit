Ext.define('Path', {
	extend: 'Ext.panel.Panel',
	semesters: 3,
	layout: 'hbox',
	region: 'north',
	autoScroll: true,
	
	initComponent:function(){
		var i = 0, semArray = [], me = this;
	
		while(i<me.semesters){
			semArray.push({
				xtype: 'multiselect',
				width: 125,
				displayField: 'c_name',
				dragGroup: 'path',
				dropGroup: 'path',
				name: 'multiselect-'+i,
				id: 'multiselect-field-'+i,
				listTitle: 'Semester '+(i+1),
// 				store: [ds.pop(),ds.pop(),ds.pop(),ds.pop()],
			});
			i++;
		}
		me.items = semArray.concat([{
			xtype: 'panel',
			layout: 'fit',
			items: [{
				xtype	: 'button',
				text	: 'Add Semester',
				handler : function(butt){
					me.semesters++,
					me.insert(me.semesters-1,{
						xtype: 'multiselect',
						width: 125,
						displayField: 'field1',
						dragGroup: 'path',
						dropGroup: 'path',
						name: 'multiselect-'+me.semesters-1,
						id: 'multiselect-field-'+me.semesters-1,
						listTitle: 'Semester '+(me.semesters),
						store: [], //blank store to begin
	// 					listeners: {
	// 						boundList: {
	// 							itemdblclick: me.onItemDblClick,
	// 							scope: me
	// 						}
	// 					}
					});
				}
			},{
				xtype	: 'button',
				text	: 'Test stuff',
				handler : function(butt){
					console.log(me);
				}
			}]	
		}]);
		// console.log(semArray);
		
	   	this.callParent();
    },
	
	listeners:{
		beforerender: function(me){
			console.log("rendered");
		}
	},
	/*	Functions	*/

});
