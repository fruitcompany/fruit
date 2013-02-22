Ext.define('GPAS.view.user.List' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.userlist',

	store: 'Classes',

    title : 'All Users',

    initComponent: function() {
        
        // this.columns = [
//             {header: 'Name',  dataIndex: 'name',  flex: 1},
//             {header: 'Email', dataIndex: 'email', flex: 1}
//         ];

        this.callParent(arguments);
    }
});