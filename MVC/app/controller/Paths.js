//the Users controller will make sure that the User model is included on the page and available to our app
Ext.define('GPAS.controller.Paths', {
    extend: 'Ext.app.Controller',
    stores: ['Courses','Classes'],
    models: ['Course','Class'],
    views: [
        'user.List',
        'user.Edit',
        'user.Path',
        'user.Semester',
        'Login'
    ],
    refs: [{
		selector: 'viewport > panel[region=center]',
		ref: 'pathPanel'
	},{
		selector: 'viewport',
		ref: 'vp'
	},{
		selector: 'viewport > panel[region=center] > path',
		ref: 'path'
	}],
    
    init: function() {
        this.control({
            'viewport > login > panel > panel > button': {
                login: this.loginUser
            },
	    'viewport > userlist': {
                itemdblclick: this.editUser
            },
            'useredit button[action=save]': {
                click: this.updateUser
            },
            'viewport > panel': {
                render: this.onPanelRendered
            },
            'viewport > panel > button[action=test]': {
		click: function(){
		    var path = this.getPathPanel().down('path');
		}
            },
            'viewport > panel > button[action=add_path]': {
                click: this.addNewPath
            },
            'viewport > panel[region=center] > path > store': {
                load: this.onPathStoreLoad,
                datachange: function(){
                	console.log("data Changed");
                }
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
    
    loginUser: function(create, info){
	console.log('login...',create,info);
	Ext.Ajax.request({
	    url: 'data/User.pl',
	    params: {
		create	: create,
		info	: info
	    },
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    defaultHeaders: {
		'Content-Type': 'application/json; charset=iso-8859-1'
	    },
	    success: function(response){
		var text = response.responseText;
		// process server response here
		console.log(text);
	    }
	});
    },

    onPanelRendered: function() {
        console.log('The panel was rendered');
    },
    
    addNewPath: function() {
    	pathPanel = this.getPathPanel();
    	pathPanel.add(Ext.create('GPAS.view.user.Path', {
    		
    	}));
    },
    addPanel: function() {
    	pathPanel = this.getPathPanel();
    	console.log(pathPanel);
    	pathPanel.add({ xtype:'userlist'});
    },
    onPathStoreLoad: function(store, recs, suc, op) {
    	console.log(store);
    }
});