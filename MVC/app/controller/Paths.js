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
		    var me = this;

		    if(textfield.getId()=='createuName'){
			Ext.Ajax.request({
			    url: 'data/checkUser.pl',
			    method: 'POST',
			    params: {
				uname : textfield.getValue(),
				s_id : ''
			    },

			    callback: function(options, success, response){
				var text = response.responseText;

				if(success && Number(text)){

				    console.log('not valid');
				    textfield.markInvalid("Username is already in use.");
				} else {

				    console.log("valid");
				    textfield.clearInvalid();
				}
				me.setCreateButton(textfield);
			    }
			});
		    } else if (textfield.getId() =='createStudentID') {
			Ext.Ajax.request({
			    url: 'data/checkUser.pl',
			    method: 'POST',
			    params: {
				uname : '',
				s_id : textfield.getValue()
			    },

			    callback: function(options, success, response){
				var text = response.responseText;

				if(success && Number(text)){
				    console.log('not valid');
				    textfield.markInvalid("Student ID is already in use.");
				} else {
				    console.log("valid");
				    textfield.clearInvalid();
				}
				me.setCreateButton(textfield);
			    }
			});
		    } else {
			me.setCreateButton(textfield)
		    }


		},
		validitychange: function(textfield, isValid, op){
		    console.log("Validity change", textfield, isValid, op);
		}
            },
	    'viewport > userlist': {
                itemdblclick: this.editUser
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
			'viewport > panel > button[action=save_path]': {
				click: function(){
					console.log("save path");
				}
			}
        });
    },

    setCreateButton: function(textfield) {
	var p = textfield.up('panel'),
	    tfs = p.query('textfield'),
	    valid = false;

	Ext.each(tfs, function(t){
	    valid = t.isValid();
	    return valid;
	});

	Ext.getCmp('create_button').setDisabled(!valid);
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
	    var user = Ext.create('GPAS.model.Student',info);
	    user.save({
		success:function(u,b,c){
		    var log = controller.getLog();
		    console.log('Success loading user/student',u,b,c)
		    log.destroy();
		    controller.buildPathManager(u);
		},
		failure:function(a,b,c){
		    alert('Failure to log in');
		    console.log(a,b,c);
		}
	    });
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