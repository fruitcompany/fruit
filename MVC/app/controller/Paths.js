//the Users controller will make sure that the User model is included on the page and available to our app
Ext.define('GPAS.controller.Paths', {
    extend: 'Ext.app.Controller',
    stores: ['Courses','Classes'],
    models: ['Course','Class','Path','Student'],
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
                makenewpath: function(win, major, year,sem){
		    win.close();
		    this.addNewPath(major,year,sem);
		}
            },
            'login > panel > panel > button': {
                login: this.loginUser,
		
            },
	    'login > panel > panel > textfield': {
                change: function(textfield, newV, oldV){
		    var p = textfield.up('panel'),
			tfs = p.query('textfield'),
			valid = false,
			sid,uname;
		    
		    Ext.each(tfs, function(t){
			valid = t.isValid();
			if(valid && t.getId == 'createStudentID'){
			    sid = t.getValue()
			} else if (valid && t.getId == 'createuName'){
			    uname = t.getValue();
			}
			return valid;
		    });
		    if(valid){
			Ext.Ajax.request({
			    url: 'data/checkUser.pl',
			    method: 'POST',
			    params: {
				uname : uname,
				sid : sid
			    },
			    
			    callback: function(options, success, response){
				var text = response.responseText;
				    
				if(success && text.length>5){
				    valid = false;
				    alert("Username or Student ID already in use.");
				} else {
				    valid = true;
				}
				// process server response here
				console.log(text);
			    }
			});   
		    }
		    Ext.getCmp('create_button').setDisabled(!valid);
		    
		    //console.log("change", p, p.query('textfield'),textfield, newV,oldV);
		    
		},
		validitychange: function(textfield, isValid, op){
		    console.log("Validity change", textfield, isValid, op);
		}
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
		    console.log(path.store);
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
    
    buildPathManager: function(user){
	var pm = Ext.create('GPAS.view.PathManager'),
	    controller = this;
	
	user.paths().each(function(path){
	    controller.loadPath(pm,path);
	});
    },
    
    loadPath: function(pm, pathData) {
	var pathPanel = this.getPathPanel(),
	    path, semesters, SY,SS,LS,LY,
	    classes 	= pathData.classes().getRange(),
	    numClasses 	= classes.length;
	    
	//console.log(pathData, classes);
	if(classes){
	    SY = classes[0].get('Year');
	    SS = classes[0].get('Term');
	    LY = classes[numClasses-1].get('Year');
	    LS = classes[numClasses-1].get('Term');
	    
	    semesters = (LY-SY)*4-
			((SS == 'SPRING') ? 0 :
			((SS == 'SUMMER') ? 1 :
			((SS == 'FALL')   ? 2 : 3)))+
			((LS == 'SPRING') ? 1 :
			((LS == 'SUMMER') ? 2 :
			((LS == 'FALL')   ? 3 : 4)));
	    
	    
	    path = Ext.create('GPAS.view.user.Path', {
		store		 : pathData.classes(),
		semesters 	 : semesters,
		startingYear     : SY,
		startingSemester : SS
	    });
	    
	    //path.store.loadRecords(classes);
	    
	    pathPanel.insert(pathPanel.items.length-1, path);
	}
    },
    
    loginUser: function(create, info){
	console.log('login...',create,info);
	var controller = this;
	
	if(!create){
	    Ext.Ajax.request({
		url: 'data/login.pl',
		method: 'POST',
		params: {
		    username : info.User_Name,
		    password : info.Password
		},
		
		callback: function(options, success, response){
		    var text = response.responseText,
			log = controller.getLog(),
			id = Number(text);
			
		    if(success && id){
			console.log("id",id);
			Ext.ModelManager.getModel('GPAS.model.Student').load(id,{
			    success: function(user){
				console.log("loaded user", user);
				log.destroy();
				controller.buildPathManager(user);
			    }
			});
		    } else {
			alert("Incorrected Username or Password");
		    }
		    // process server response here
		    console.log(text);
		}
	    });   
	} else {
	    Ext.ModelManager.getModel('GPAS.model.Student').create(info);
	}
    },

    onPanelRendered: function() {
        console.log('The panel was rendered');
    },
    
    addNewPath: function(major, year, sem) {
	pathPanel = this.getPathPanel();
	
	pathPanel.setLoading(true);
	Ext.defer(function(){
	    Ext.ModelManager.getModel('GPAS.model.Path').load(1,{
		success:function(path){
		    console.log("SUCCESS!!",path);
		    
		    pathPanel.on('add',function(){
			pathPanel.setLoading(false);
		    },{single:true});
		    pathPanel.insert(pathPanel.items.length-1, Ext.create('GPAS.view.user.Path', {
			store		 : path.classes(),
			semesters 	 : 15,
			startingYear     : year,
			startingSemester : sem
		    }));
		}
	    });
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