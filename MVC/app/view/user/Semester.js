Ext.define('GPAS.view.user.Semester' ,{
    extend: 'GPAS.view.ux.form.MultiSelect',
    alias : 'widget.semester',

	store: 'Classes',
	width: 125,
	height: 200,
	displayField: 'c_name',
	autoScroll:true,
    initComponent: function() {
        
//         console.log(this,"is done");

        this.callParent(arguments);
    }
});