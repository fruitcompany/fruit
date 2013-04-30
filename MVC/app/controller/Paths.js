//the Users controller will make sure that the User model is included on the page and available to our app
Ext.define('GPAS.controller.Paths', {
    extend: 'Ext.app.Controller',
    stores: ['Courses','Classes', 'Student', 'Paths', 'Users'],
    models: ['Course','Class','Path','Student', 'Semester'],
    views: [
        'user.Path',
        'user.Semester',
        'Login',
		'PathManager',
		'NewPath',
		'addClass',
		'InfoBox'

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

					//if(textfield.getId()=='createuName'){
					//	Ext.Ajax.request({
					//		url: 'data/checkUser.pl',
					//		method: 'POST',
					//		params: {
					//			uname : textfield.getValue(),
					//			s_id : ''
					//		},
					//		callback: function(options, success, response){
					//			var text = response.responseText;
					//
					//			if(success && Number(text)){
					//				console.log('not valid');
					//				textfield.markInvalid("Username is already in use.");
					//			} else {
					//				console.log("valid");
					//				textfield.clearInvalid();
					//			}
					//			me.setCreateButton(textfield);
					//		}
					//	});
					//} else if (textfield.getId() =='createStudentID') {
					//	Ext.Ajax.request({
					//		url: 'data/checkUser.pl',
					//		method: 'POST',
					//		params: {
					//			uname : '',
					//			s_id : textfield.getValue()
					//		},
					//		callback: function(options, success, response){
					//			var text = response.responseText;
					//			if(success && Number(text)){
					//				console.log('not valid');
					//				textfield.markInvalid("Student ID is already in use.");
					//			} else {
					//				console.log("valid");
					//				textfield.clearInvalid();
					//			}
					//			me.setCreateButton(textfield);
					//		}
					//	});
					//} else {
					//	me.setCreateButton(textfield)
					//}
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
            'viewport > panel > toolbar > button[action=add_path]': {
                click: function(){
					addWin = Ext.create('GPAS.view.NewPath').show();
				}
            },
            'viewport > panel[region=center] > path > panel > panel > button': {
                click: function(button){

					switch (button.action) {
						case 'remove_path':
							console.log('remove_path');
							console.log(button);
							var SStore = this.getStudentStore();
							var SRec = SStore.getAt(0);
							var paths = SRec.paths();
							var pathPanel = this.getPathPanel();

							paths.remove(button.path.pathRec);
							paths.save();
							button.path.destroy();
							count = 1;
							//paths.each(function(path){
							Ext.each(pathPanel.items.items,function(path){
								console.log(path);
								path.pathRec.set('Path_Rank', count);
								//path.infoBox.updateRank({rank: count});
								path.infoBox.updateInfo();
								count++;
							});

							break;
						case 'move_path_up':

							console.log('move_path_up');
							var SStore = this.getStudentStore();

							var SRec = SStore.getAt(0);

							var paths = SRec.paths();

							if(button.path.pathRec.get('Path_Rank') == 1)
								break;

							console.log(button.path.pathRec.get('Path_Rank'), 'not equals 1');
							var oldRank = parseInt(button.path.pathRec.get('Path_Rank'));

							var newRank = oldRank - 1;

							paths.each(function(path){
								var currentPathRank = parseInt(path.get('Path_Rank'));
								if(oldRank == currentPathRank)
								{
									path.set('Path_Rank', newRank);
									console.log(oldRank, ' equals ', currentPathRank);
									console.log(path);
								}

								if(newRank == currentPathRank)
								{
									path.set('Path_Rank', oldRank);
									console.log(newRank, ' equals ', currentPathRank);
									console.log(path);
								}
							});

							var pathPanel = this.getPathPanel();
							console.log(pathPanel);
							var temp;
							console.log('swapping: ', pathPanel.items.items[oldRank - 1], pathPanel.items.items[newRank - 1]);
							var firstItem = pathPanel.items.items[oldRank - 1];
							temp = pathPanel.items.items[newRank - 1];
							pathPanel.items.items[newRank - 1] = firstItem;
							pathPanel.items.items[oldRank - 1] = temp;
							pathPanel.doLayout();
							//pathPanel.items.items[newRank - 1].infoBox.updateRank({rank: newRank});
							//pathPanel.items.items[oldRank - 1].infoBox.updateRank({rank: oldRank});
							pathPanel.items.items[newRank - 1].infoBox.updateInfo();
							pathPanel.items.items[oldRank - 1].infoBox.updateInfo();


							break;
						case 'move_path_down':

							console.log('move_path_down');
							var SStore = this.getStudentStore();

							var SRec = SStore.getAt(0);

							var paths = SRec.paths();

							if(button.path.pathRec.get('Path_Rank') == paths.getCount())
								break;

							console.log(button.path.pathRec.get('Path_Rank'), 'not equals ', paths.getCount());
							var oldRank = parseInt(button.path.pathRec.get('Path_Rank'));

							var newRank = oldRank + 1;

							paths.each(function(path){
								var currentPathRank = parseInt(path.get('Path_Rank'));
								if(oldRank == currentPathRank)
								{
									path.set('Path_Rank', newRank);
									console.log(oldRank, ' equals ', currentPathRank);
									console.log(path);
								}

								if(newRank == currentPathRank)
								{
									path.set('Path_Rank', oldRank);
									console.log(newRank, ' equals ', currentPathRank);
									console.log(path);
								}

							});

							var pathPanel = this.getPathPanel();
							console.log(pathPanel);
							var temp;
							console.log('swapping: ', pathPanel.items.items[oldRank - 1], pathPanel.items.items[newRank - 1]);
							var firstItem = pathPanel.items.items[oldRank - 1];
							temp = pathPanel.items.items[newRank - 1];
							pathPanel.items.items[newRank - 1] = firstItem;
							pathPanel.items.items[oldRank - 1] = temp;
							pathPanel.doLayout();
							//pathPanel.items.items[newRank - 1].infoBox.updateRank({rank: newRank});
							//pathPanel.items.items[oldRank - 1].infoBox.updateRank({rank: oldRank});
							pathPanel.items.items[oldRank - 1].infoBox.updateInfo();
							pathPanel.items.items[newRank - 1].infoBox.updateInfo();


							break;
						default:
							console.log('wtf button did you press??!?!?!?!');
							break;
					}

				}
            },
            'viewport > panel[region=center] > path > store': {
                load: this.onPathStoreLoad,
                datachange: function(){
                    console.log("data Changed");
                }
            },
			'viewport > panel[region=center] > toolbar > button': {
				click: function(butt){
					var me = this;
					console.log(butt,butt.action);
					switch(butt.action){
						case "save_path":
							me.pathSave();
							break;
						case "cancel":
							me.cancelPathUpdate();
							break;
						default:
							console.log('wtf button did you press??!?!?!?!');
							break;
					}
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

	updatePaths: function(){

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
			path,
			sems 	= pathData.semesters(),
			numSems 	= sems.getCount();
		console.log(pm,pathData);
		//console.log(pathData, classes);
		if(sems){

			path = Ext.create('GPAS.view.user.Path', {
				pathRec		 : pathData,
				store		 : sems,
				semesters 	 : numSems,
				startingYear     : sems.getAt(0).get('Year'),
				startingSemester : sems.getAt(0).get('Term'),
				pathRank : pathData.get('Path_Rank')
			});

			//path.store.loadRecords(classes);

			pathPanel.add(path);
			pathPanel.setLoading(false);
		}
		//var pathPanel = this.getPathPanel(),
		//	path, semesters, SY,SS,LS,LY,
		//	classes 	= pathData.classes().getRange(),
		//	numClasses 	= classes.length;
		//
		////console.log(pathData, classes);
		//if(classes){
		//	SY = classes[0].get('Year');
		//	SS = classes[0].get('Term');
		//	LY = classes[numClasses-1].get('Year');
		//	LS = classes[numClasses-1].get('Term');
		//
		//	semesters = (LY-SY)*4-
		//		((SS == 'SPRING') ? 0 :
		//		((SS == 'SUMMER') ? 1 :
		//		((SS == 'FALL')   ? 2 : 3)))+
		//		((LS == 'SPRING') ? 1 :
		//		((LS == 'SUMMER') ? 2 :
		//		((LS == 'FALL')   ? 3 : 4)));
		//
		//
		//	path = Ext.create('GPAS.view.user.Path', {
		//		store		 : pathData.classes(),
		//		semesters 	 : semesters,
		//		startingYear     : SY,
		//		startingSemester : SS
		//	});
		//
		//	//path.store.loadRecords(classes);
		//
		//	pathPanel.insert(pathPanel.items.length-1, path);
		//}
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

						//controller.getStudentStore().load(id, {
						//	params: { id : id },
						//	success: function(user){
						//		console.log("loaded user", user);
						//		log.destroy();
						//		controller.buildPathManager(user);
						//	}
						//});

						console.log(controller.getStudentStore());
						Ext.ModelManager.getModel('GPAS.model.Student').load(id,{
							success: function(user){
								console.log("loaded user", user);
								log.destroy();
								controller.buildPathManager(user);
								controller.getStudentStore().add(user);
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
		var pathPanel = this.getPathPanel();
		var user = this.getStudentStore().getAt(0);

		pathPanel.setLoading(true);
		Ext.defer(function(){
			//This needs to query the available classes and set up new path

			//var path = Ext.create('GPAS.model.Path', {
			//	Major: major,
			//	Year: year,
			//	Semester: sem,
			//	ID: user.get('Student_ID')
			//});


			Ext.Ajax.request({
				url: 'app/rest.php?_m=path&_verb=create&content=crap',
				params: {
					Major: major,
					Year: year,
					Semester: sem,
					ID: user.get('Student_ID')
				},
				reader : {
					type : 'json'

				},
				writer : {
					type : 'json',
					encode : true
				},
				success: function(response,a,b,c){
					var rtext = Ext.decode(response.responseText);
					console.log(response,a,b,c,rtext);
					Ext.ModelManager.getModel('GPAS.model.Path').load(rtext.path_id,{
						success:function(path){
							console.log("SUCCESS!!",path);

							user.paths().add(path);

							pathPanel.on('add',function(){
								pathPanel.setLoading(false);
							},{single:true});
							pathPanel.add(Ext.create('GPAS.view.user.Path', {
								pathRec		 : path,
								store		 : path.semesters(),
								semesters 	 : path.semesters().getCount(),
								startingYear     : year,
								startingSemester : sem,
								pathRank : path.get('Path_Rank')
							}));
						}
					});
				}
			});

			//path.save({
			//	success:function(path){
			//		console.log("SUCCESS!!",path);
			//
			//		pathPanel.on('add',function(){
			//			pathPanel.setLoading(false);
			//		},{single:true});
			//		pathPanel.insert(pathPanel.items.length-1, Ext.create('GPAS.view.user.Path', {
			//			store		 : path.classes(),
			//			semesters 	 : 15,
			//			startingYear     : year,
			//			startingSemester : sem
			//		}));
			//	}
			//});



		},20);
    },

	addPanel: function() {
    	pathPanel = this.getPathPanel();
    	console.log(pathPanel);
    	pathPanel.add({ xtype:'userlist'});
    },
    onPathStoreLoad: function(store, recs, suc, op) {
    	console.log(store);
    },

	pathSave: function(){
		console.log("save path");
		//var path = this.getPathPanel().down('path');

		var SStore = this.getStudentStore();
		console.log(SStore);

		var SRec = SStore.getAt(0);
		console.log(SRec);

		var paths = SRec.paths();
		console.log(paths);

		var str = "{ student : { data : " + JSON.stringify(SRec.data) + ", paths : [";

		paths.each(function(path){
			str += "{ data : " + JSON.stringify(path.data) + ", semesters: [";
			path.semesters().each(function(sem){
				str += "{ data : " + JSON.stringify(sem.data) + ", classes: [";
				sem.classes().each(function(cl){
					str += "{ data : " + JSON.stringify(cl.data) + " }, ";
				});
				str += " ] },";
			});
			str += " ] },";
		});
		str += " ] } }";
		console.log(Ext.JSON.decode(str),str);
		Ext.Ajax.request({
			url: 'app/rest.php?_m=student&_verb=update',
			//params: {
			//	Student : Ext.JSON.decode(str)
			//},
			jsonData: Ext.JSON.decode(str),
			reader : {
				type : 'json'

			},
			writer : {
				type : 'json',
				encode : true
			},
			success: function(response,a,b,c){
				var rtext = Ext.decode(response.responseText);
				console.log(response,a,b,c,rtext);
			},
			failure: function(response,a,b,c){
				var rtext = Ext.decode(response.responseText);
				console.log(response,a,b,c,rtext);
			}
		});
	},

	cancelPathUpdate: function(){
		var controller = this;
		var SStore = this.getStudentStore();
		var SRec = SStore.getAt(0);
		var pathPanel = this.getPathPanel();
		pathPanel.setLoading(true);
		pathPanel.removeAll();
		console.log('Cancel Edits');

		Ext.ModelManager.getModel('GPAS.model.Student').load(SRec.get('Student_ID'),{
			success: function(user){
				console.log("loaded user", user);
				var pm = Ext.ComponentQuery.query('viewport')[0];
				user.paths().each(function(path){
		    		controller.loadPath(pm, path);
				});
				pathPanel.setLoading(false);
			},
			failure: function(){
				pathPanel.setLoading(false);
			}
		});

	}
});