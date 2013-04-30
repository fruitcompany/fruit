Ext.define('GPAS.view.user.Path' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.path',

    semesters	: 20,

    semesterWidth	: 150,
	semesterHeight  : 200,

    //semesterNames	: ["FALL","WINTER","SPRING","SUMMER"],
    semesterNames	: ["FALL","SPRING"],

    startingYear	: 2008,
    startingSemester: "FALL",
	pathUnits: 0,

    pathRank : 0,

    border		: 0,

    edgeSpace		: 500,

    layout: {
	    type:'hbox',
	    //pack: 'center',
    },

    store: 'Classes',
	infoBox: undefined,


    initComponent: function(){
		var i = 0,
			pathUnits = 0,
			semArray= [],
			me 		= this,
			year	= me.startingYear;

		me.DDGroup = 'DDPath-'+me.id;

		//me.store = Ext.data.StoreManager.lookup(me.store || 'ext-empty-store');

	// ------------------------------------------------------------------------------------------------------------


		me.store.each(function(rec){
			var term = rec.get('Term'),
				year = rec.get('Year'),
				store = rec.classes();
				store.each(function(a){
					me.pathUnits += parseInt(a.get('Units'));
				});
				console.log(rec);

				//pathUnits = pathUnits + parseInt(rec.get('Units'));
			//store.on('add',function(a,b){ me.onDrop(me,a,b) } );
			store.semester = {Term: term, Year: year};

			semArray.push({
				xtype	: 'semester',
				width	: me.semesterWidth,
				term	: term,
				year	: year,

				itemId	: term + "_" + year + "_" + me.id,
				id		: term + "_" + year+"_selectfield_"+me.id,
				//listTitle	: term + " " + year,
				title	: term + " " + year,
				store	: store,
				viewConfig: {
					plugins: {
						ptype: 'gridviewdragdrop',
						dragGroup	: me.DDGroup,
						dropGroup	: me.DDGroup,
					},
					listeners: {
						beforedrop: function (node, data, overModel, dropPosition, dropFunction, eOpts) {
							var term = overModel.get('Term'),
								year = overModel.get('Year');
							console.log(node, data, overModel, dropPosition, dropFunction, eOpts);
							me.onDrop(me,term,year,data.records,dropFunction)
							//var recs = data.records;

							return false;
						}
					}
				},
				listeners: {
					itemdblclick: me.onItemDblClick,
					itemcontextmenu: function(a,b,c,d,e){ me.onRightClick(me,a,b,c,d,e); },
					containercontextmenu: function(a,b){ me.addClassClick(me,a,b) },

				}
			});
			me.lastTerm = term;
			me.lastYear = year;
		});

		var contents = semArray.concat([{
			xtype: 'panel',
			layout: 'fit',
			items: [{
				xtype	: 'button',
				text	: 'Add Semester',
				handler : function(butt){
					me.semesters++;
					if (me.lastTerm == 'FALL') {
					    me.lastTerm = 'SPRING';
					    me.lastYear++;
					} else {
					    me.lastTerm = 'FALL';
					}
					butt.up('panel').up('panel').insert(me.semesters-1,{
					    xtype: 'semester',
					    width: me.semesterWidth,
					    term	: me.lastTerm,
					    year	: me.lastYear,
					    itemId	: me.lastTerm + "_" + me.lastYear + "_" + me.id,
					    id		: me.lastTerm + "_" + me.lastYear+"_selectfield_"+me.id,
					    title	: me.lastTerm + " " + me.lastYear,
					    store	: Ext.create('Ext.data.Store', {
							model	: 'GPAS.model.Class',
							semester : { Term : me.lastTerm, Year : me.lastYear },
					    }),
					    viewConfig: {
							plugins: {
								ptype: 'gridviewdragdrop',
								dragGroup	: me.DDGroup,
								dropGroup	: me.DDGroup,
							}
						},
						listeners: {
							itemdblclick: me.onItemDblClick,
							itemcontextmenu: function(a,b,c,d,e){ me.onRightClick(me,a,b,c,d,e); },
							containercontextmenu: function(a,b){ me.addClassClick(me,a,b) },
						}
					});
					//me.setWidth(me.width+me.semesterWidth);
					//me.down('panel').down('panel').setWidth(me.width+me.semesterWidth);
					//me.infoBox.updateInfo({units: me.pathUnits, rank : me.pathRank,
					//	lastTerm: me.lastTerm, lastYear: me.lastYear});
					me.infoBox.updateInfo();
					//me.width += me.semesterWidth;
				}
			}]
		}]);

		//semArray.splice(0,0,[{
		//	xtype: 'panel',
		//	layout: 'fit',
		//	items: [{
		//		xtype	: 'label',
		//		html	: '<p>Units: ' + pathUnits + '<BR/>' + 'Rank: ' + me.pathRank + '<BR/>Est. Graduation:<BR/>' + me.lastTerm + ' ' +
		//	me.lastYear + '</p>'
		//	},{
		//		xtype: 'button',
		//		text: 'X',
		//		action: 'remove_path',
		//		path: me
		//	}]
		//}]);
		me.infoBox = ib = Ext.create('GPAS.view.InfoBox', {
			path: me,
			height: me.semesterHeight
		});
		//ib.updateInfo({units: me.pathUnits, rank : me.pathRank,
		//			lastTerm: me.lastTerm, lastYear: me.lastYear});
		ib.updateInfo();

		me.items = [ib, {
			xtype: 'panel',
			layout: 'auto',
			//height: me.semesterHeight,
			border: 0,
			autoScroll: true,
			//defaults:{autoHeight: true},
			flex: 1,
			items: {
				xtype: 'panel',
				width: me.semesters*me.semesterWidth+3*me.edgeSpace,
				border: 0,
				height: me.semesterHeight,

				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				//defaults: {flex: 1},
				autoScroll: true,
				items: contents
			}
		}]
		//me.width = me.semesters*me.semesterWidth+3*me.edgeSpace;
		console.log("new Path object",this);

		this.callParent(arguments);
	},



    loadData: function(data) {
		Ext.each(data, function(rec) {
			console.log(rec);
		});
    },

    onItemDblClick: function(view,rec,b,c){
		console.log(view,rec);
		Ext.create('Ext.window.Window', {
			title: rec.get('Course_Name')+" - "+rec.get('Course_Title'),
			height: 200,
			width: 400,
			layout: 'fit',
			items: {  // Let's put an empty grid in just to illustrate fit layout
			xtype: 'panel',
			border: false,
			autoScroll: true,
			frame: true,
			html:'<p><b>Term: </b>'+rec.get('Term')+"&nbsp;&nbsp;&nbsp;&nbsp;<b>Year: </b>"+rec.get('Year')+"<br/>"
				+'<b>Department: </b>'+rec.get('Department')+'&nbsp;&nbsp;&nbsp;&nbsp;<b>Type: </b>'+rec.get('Type')+"&nbsp;&nbsp;&nbsp;&nbsp;<b>Units: </b>"+rec.get('Units')+'<br/>'
				+'<b>Description: </b><br/><p>'+rec.get('Description')+'</p></p>'
			}
		}).show();
    },

	onDrop: function(p,term,year,recs,df){
		console.log(recs);
		//var ty = store.semester,
		var me = p;
		console.log(term,year, p);

		console.log(recs);
		console.log(term,year);

		Ext.each(recs,function(rec){
			Ext.Ajax.request({
				url: 'data/checkClass.pl',
				method: 'POST',
				params: {
					name : rec.get('Course_Name'),
					year : year,
					term : term
				},

				callback: function(options, success, response){
					var text = response.responseText,
						id = Number(text);


					if(success && id){
						console.log("new class id",id);

						rec.set('Year',year);
						rec.set('Term',term);
						rec.set('Class_ID', id);
						rec.set('id', id);


					} else {
						alert("Failed to find Class in Availability");
						console.log("new class id",id);
						rec.set('Available',false);
						rec.set('Year',year);
						rec.set('Term',term);
						rec.set('Class_ID', id);
						rec.set('id', id);
					}
					df();
					//me.infoBox.updateInfo({units: me.pathUnits, rank : me.pathRank,
					//lastTerm: me.lastTerm, lastYear: me.lastYear});
					me.infoBox.updateInfo();
				}
			});
		});
	},
	onRightClick: function(p,table, record, item, index, e, eOpts){
		var me = this;

		console.log("Right Click",table,record,item,index,e);
		e.stopEvent();
		Ext.create('Ext.menu.Menu',{
			items: [{
				text: 'Delete',
				icon: '../extjs-4.0.7/examples/shared/icons/fam/delete.gif',
				handler: function(a,b){
					//Delete Rec (Class)
					table.getStore().remove(record);
					p.pathUnits -= record.get('Units');
					//p.infoBox.updateInfo({units: p.pathUnits, rank : p.pathRank,
					//lastTerm: p.lastTerm, lastYear: p.lastYear});
					p.infoBox.updateInfo();
				}
			},{
				text: 'Edit'
			}]
		}).showAt(e.getXY());
	},

	addClassClick : function(p,semObj,e){
		console.log(semObj,semObj.getStore().semester.Year,semObj.getStore().semester.Term);
		e.stopEvent();
		Ext.create('Ext.menu.Menu',{
			items: [{
				text: 'Add Class',
				icon: '../extjs-4.0.7/examples/shared/icons/fam/add.gif',
				handler: function(a,b){
					win = Ext.create('GPAS.view.addClass', {
						Year: semObj.getStore().semester.Year,
						Term: semObj.getStore().semester.Term,
						semStore: semObj.getStore(),
						path: p
					}).show();
					console.log(win);
				}
			}]
		}).showAt(e.getXY());
	}
});