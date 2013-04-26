Ext.define('GPAS.view.user.Semester' ,{
    //extend: 'GPAS.view.ux.form.MultiSelect',
	extend: 'Ext.grid.Panel',
    alias : 'widget.semester',

	store: 'Classes',
	width: 125,
	height: 200,
	//displayField: 'Course_Name',
	autoScroll:true,
	hideHeaders: true,
	columns: [
		{
			text: "Class",
			dataIndex: "Course_Name",
			flex: 1
		}
	],

//	listeners: {
//        itemcontextmenu: function(a,b,c,d,e){
//         	console.log(a,b,c,d,e);
//        }
//	},
    initComponent: function() {

        this.callParent(arguments);
    }
});