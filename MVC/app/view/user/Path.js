Ext.define('GPAS.view.user.Path' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.path',

		semesters: 5,
        layout: 'hbox',
        
        initComponent: function(){
        	var i = 0, semArray = [], me = this;
		
			while(i<me.semesters){
				semArray.push({
					xtype: 'panel',
					width: 125,
					height: 200,
// 					displayField: 'c_name',
// 					dragGroup: 'path',
// 					dropGroup: 'path',
					name: 'multiselect-'+i,
					id: 'multiselect-field-'+i,
					listTitle: 'Semester '+(i+1),
// 					store: [ds.pop(),ds.pop(),ds.pop(),ds.pop()], //blank store to begin
					
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
							xtype: 'panel',
							width: 125,
							height: 200,
// 							displayField: 'field1',
// 							dragGroup: 'path',
// 							dropGroup: 'path',
							name: 'multiselect-'+me.semesters-1,
							id: 'multiselect-field-'+me.semesters-1,
							listTitle: 'Semester '+(me.semesters),
// 							store: [], //blank store to begin
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
        this.callParent(arguments);
    }
});