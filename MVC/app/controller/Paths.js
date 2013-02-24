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
        'Login',
	'PathManager',
	'NewPath'
    ],
    refs: [{
		selector: 'viewport > panel[region=center]',
		ref: 'pathPanel'
	},{
		selector: 'viewport',
		ref: 'vp'
	},{
		selector: 'login',
		ref: 'log'
	},{
		selector: 'viewport > panel[region=center] > path',
		ref: 'path'
	}],
    
    init: function() {
        this.control({
	    'newpath > button': {
                makenewpath: function(win, major, year){
		    win.close();
		    this.addNewPath(major,year);
		}
            },
            'login > panel > panel > button': {
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
                click: function(){
		    addWin = Ext.create('GPAS.view.NewPath').show();
		}
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
	var controller = this;
	
	
	
	if(!create){
	    Ext.Ajax.request({
		url: 'data/login.pl',
		method: 'POST',
		params: {
		    username : info.uName,
		    password : info.pName
		},
		
		success: function(response){
		    var text = response.responseText,
			log = controller.getLog();
		    
		    //log.destroy();
		    //Ext.create('GPAS.view.PathManager');
		    
		    // process server response here
		    console.log(text);
		    
		}
	    });
	    
	    
	    
	    
	    /*Ext.Ajax.request({
		url: 'data/Classes.json',
		
		success: function(response){
		    var text = response.responseText,
			log = controller.getLog();
		    
		    log.destroy();
		    Ext.create('GPAS.view.PathManager');
		    
		    // process server response here
		    console.log(text);
		    
		}
	    });*/
	}
	//Ext.Ajax.request({
	//    url: 'data/User.pl',
	//    method: 'Post',
	//	jsonData: Ext.encode({
	//	    create	: create,
	//	    info	: info
	//	}),
	//    dataType:'json',
	//
	//    headers: { 'Content-Type' : 'application/json' },
	//
	//    success: function(response){
	//	var text = response.responseText,
	//	    log = controller.getLog();
	//	
	//	log.destroy();
	//	Ext.create('GPAS.view.PathManager');
	//	
	//	// process server response here
	//	console.log(text);
	//	
	//    }
	//});
    },

    onPanelRendered: function() {
        console.log('The panel was rendered');
    },
    
    addNewPath: function(major, year) {
	pathPanel = this.getPathPanel();
	
	pathPanel.setLoading(true);
	Ext.defer(function(){
	    
	    pathPanel.on('add',function(){
		pathPanel.setLoading(false);
	    },{single:true});
	    pathPanel.insert(pathPanel.items.length-1, Ext.create('GPAS.view.user.Path'));
	},20);
    	
    	
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