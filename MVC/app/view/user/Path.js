Ext.define('GPAS.view.user.Path' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.path',

    semesters	: 20,

    semesterWidth	: 125,

    semesterNames	: ["FALL","WINTER","SPRING","SUMMER"],

    startingYear	: 2008,
    startingSemester: "FALL",

    border		: 0,

    edgeSpace		: 0,

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
				dragGroup	: me.DDGroup,
				dropGroup	: me.DDGroup,
				itemId	: term + "_" + year + "_" + me.id,
				id		: term + "_" + year+"_selectfield_"+me.id,
				listTitle	: term + " " + year,
				store	: store,
				listeners: {
					boundList: {
						itemdblclick: me.onItemDblClick,
						scope: me
					}
				}
			});
		});
		me.items = semArray.concat([{
			xtype: 'panel',
			layout: 'fit',
			items: [{
				xtype	: 'button',
				text	: 'Add Semester',
				handler : function(butt){
					me.semesters++,
					me.insert(me.semesters-1,{
					xtype: 'panel',
					width: 125,
					height: 200,
					//displayField: 'field1',
					//dragGroup: 'path',
					//dropGroup: 'path',
					name: 'multiselect-'+me.semesters-1,
					id: 'multiselect-field-'+me.semesters-1,
					listTitle: 'Semester '+(me.semesters),
						//store: [], //blank store to begin
					});
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


		this.callParent(arguments);
	//	var i = 0,
	//		semArray= [],
	//		me 		= this,
	//		semnms	= me.semesterNames,
	//		sem		= semnms.indexOf(me.startingSemester)
	//		semcnt	= semnms.length,
	//		year	= me.startingYear,
	//		semester="";
	//
	//	me.DDGroup = 'DDPath-'+me.id;
	//
	//	//me.store = Ext.data.StoreManager.lookup(me.store || 'ext-empty-store');
	//
	//// ------------------------------------------------------------------------------------------------------------
	//
	//	while(i<me.semesters){
	//		semester = semnms[(i+sem)%semcnt];
	//		var newStore = Ext.create('GPAS.store.Classes');
	//		me.store.each(function(rec){
	//			if(rec.get('Year') == year && rec.get('Term') == semester){
	//				newStore.add(rec);
	//			}
	//		});
	//		semArray.push({
	//			xtype	: 'semester',
	//			width	: me.semesterWidth,
	//			semester	: semester,
	//			year	: year,
	//			dragGroup	: me.DDGroup,
	//			dropGroup	: me.DDGroup,
	//			itemId	: semester + "_" + year + "_" + me.id,
	//			id		: semester + "_" + year+"_selectfield_"+me.id,
	//			listTitle	: semester + " " + year,
	//			store	: newStore,
	//			listeners: {
	//				boundList: {
	//					itemdblclick: me.onItemDblClick,
	//					scope: me
	//				}
	//			}
	//		});
	//		if(semester=="WINTER"){year++;}
	//			i++;
	//	}
	//	me.items = semArray.concat([{
	//		xtype: 'panel',
	//		layout: 'fit',
	//		items: [{
	//			xtype	: 'button',
	//			text	: 'Add Semester',
	//			handler : function(butt){
	//				me.semesters++,
	//				me.insert(me.semesters-1,{
	//				xtype: 'panel',
	//				width: 125,
	//				height: 200,
	//				//displayField: 'field1',
	//				//dragGroup: 'path',
	//				//dropGroup: 'path',
	//				name: 'multiselect-'+me.semesters-1,
	//				id: 'multiselect-field-'+me.semesters-1,
	//				listTitle: 'Semester '+(me.semesters),
	//					//store: [], //blank store to begin
	//				});
	//			}
	//		},{
	//			xtype	: 'button',
	//			text	: 'Test stuff',
	//			handler : function(butt){
	//				console.log(me);
	//			}
	//		}]
	//	}]);
	//	me.width = me.semesters*me.semesterWidth+2*me.edgeSpace;
	//
	//
	//	this.callParent(arguments);
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

	onDrop: function(store,rec){
		console.log(store,rec);
		var ty = store.semester;
		console.log(ty);

		rec[0].set('Year',ty.Year);
		rec[0].set('Term',ty.Term);
		
		console.log(rec[0]);
	}
});