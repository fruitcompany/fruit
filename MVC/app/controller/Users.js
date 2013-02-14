//the Users controller will make sure that the User model is included on the page and available to our app
Ext.define('AM.controller.Users', {
    extend: 'Ext.app.Controller',
    stores: ['Users'],
    models: ['User'],
    views: [
        'user.List',
        'user.Edit'
    ],
    
    init: function() {
        this.control({
        	'viewport > userlist': {
                itemdblclick: this.editUser
            },
            'useredit button[action=save]': {
                click: this.updateUser
            },
            'viewport > panel': {
                render: this.onPanelRendered
            },
            // 'userlist': {
//                 itemdblclick: this.editUser
//             }
        });
    },
    
    updateUser: function(button) {
		var win    = button.up('window'),
			form   = win.down('form'),
			record = form.getRecord(),
			values = form.getValues();
	
		console.log(record,values);
		record.set(values);
		win.close();
		this.getUsersStore().sync();
	},
    
    editUser: function(grid, record) {
        var view = Ext.widget('useredit');
		console.log(record);
        view.down('form').loadRecord(record);
    },

    onPanelRendered: function() {
        console.log('The panel was rendered');
    }
});