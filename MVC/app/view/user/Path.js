Ext.define('GPAS.view.user.Path' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.path',

    semesters	: 20,

    semesterWidth	: 150,

    //semesterNames	: ["FALL","WINTER","SPRING","SUMMER"],
    semesterNames	: ["FALL","SPRING"],

    startingYear	: 2008,
    startingSemester: "FALL",

    border		: 0,

    edgeSpace		: 50,

    layout: {
	    type:'hbox',
	    pack: 'center'
    },

    store: 'Classes',


    initComponent: function(){
		var i = 0,
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

			store.on('add',me.onDrop);
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
					}
				},
				listeners: {
					itemdblclick: me.onItemDblClick,
					itemcontextmenu: me.onRightClick,
				}
			});
			me.lastTerm = term;
			me.lastYear = year;
		});
		me.items = semArray.concat([{
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
					me.insert(me.semesters-1,{
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
							itemcontextmenu: me.onRightClick,
						}
					});
					me.width += me.semesterWidth;
				}
			},{
				xtype	: 'button',
				text	: 'Test stuff',
				handler : function(butt){
					console.log(me);
				}
			}]
		}]);
		me.width = me.semesters*me.semesterWidth+2*me.edgeSpace;
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

	onDrop: function(store,recs){
		console.log(store,recs);
		var ty = store.semester;
		console.log(ty);

		Ext.each(recs,function(rec){
			Ext.Ajax.request({
				url: 'data/checkClass.pl',
				method: 'POST',
				params: {
					name : rec.get('Course_Name'),
					year : ty.Year,
					term : ty.Term
				},

				callback: function(options, success, response){
					var text = response.responseText,
						id = Number(text);

					if(success && id){
						console.log("new class id",id);

						rec.set('Year',ty.Year);
						rec.set('Term',ty.Term);
						rec.set('Class_ID', id);
						rec.set('id', id);


					} else {
						alert("Failed to find Class in Availability");
						console.log("new class id",id);
						rec.set('Year',ty.Year);
						rec.set('Term',ty.Term);
						rec.set('Class_ID', id);
						rec.set('id', id);
					}
					// process server response here
					console.log(text);
				}
			});
		});
	},
	onRightClick: function(table, record, item, index, e, eOpts){
		var me = this;
		console.log("Right Click",table,record,item,index,e);
		e.stopEvent();
		Ext.create('Ext.menu.Menu',{
			items: [{
				text: 'Delete',
				icon: '../extjs-4.0.7/examples/shared/icons/fam/delete.gif',
				handler: function(a,b){
					//Delete Rec (Class)
					me.getStore().remove(record);

				}
			},{
				text: 'Edit'
			}]
		}).showAt(e.getXY());
	},

	//onDelete: function(rec,item,i){
	//	console.log(rec,item,i);
	//}
});