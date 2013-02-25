Ext.define('GPAS.view.user.Path' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.path',

    semesters	: 20,
    
    semesterWidth	: 125,
    
    semesterNames	: ["FALL","WINTER","SPRING","SUMMER"],
    
    startingYear	: 2008,
    startingSemester: "FALL",
    
    
    edgeSpace		: 100,
    
    layout: {
	    type:'hbox',
	    pack: 'center'
    },
    
    store: 'Classes',
    
    
    initComponent: function(){
	var i = 0, 
	    semArray= [], 
	    me 		= this,
	    semnms	= me.semesterNames,
	    sem		= semnms.indexOf(me.startingSemester)
	    semcnt	= semnms.length,
	    year	= me.startingYear,
	    semester="";
	
	me.DDGroup = 'DDPath-'+me.id;

	//me.store = Ext.data.StoreManager.lookup(me.store || 'ext-empty-store');
	
// ------------------------------------------------------------------------------------------------------------
    
	while(i<me.semesters){
	    semester = semnms[(i+sem)%semcnt];
	    var newStore = Ext.create('GPAS.store.Classes');
	    me.store.each(function(rec){
		if(rec.get('Year') == year && rec.get('Term') == semester){
		    newStore.add(rec);
		}
	    });
	    semArray.push({
		xtype	: 'semester',
		width	: me.semesterWidth,
		semester	: semester,
		year	: year,
		dragGroup	: me.DDGroup,
		dropGroup	: me.DDGroup,
		itemId	: semester + "_" + year + "_" + me.id,
		id		: semester + "_" + year+"_selectfield_"+me.id,
		listTitle	: semester + " " + year,
		store	: newStore,
		listeners: {
		    boundList: {
			itemdblclick: me.onItemDblClick,
			scope: me
		    }
		}
	    });
	    if(semester=="WINTER"){year++;}
	    i++;
	}
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
    },
    
    loadData: function(data) {
	Ext.each(data, function(rec) {
	    console.log(rec);
	    
	});
    },
    
    onItemDblClick: function(view,a,b,c){
	console.log(view,rec);
	Ext.create('Ext.window.Window', {
	    title: rec.get('Course_Name')+" - "+rec.get('Course_Title'),
	    height: 200,
	    width: 400,
	    layout: 'fit',
	    items: {  // Let's put an empty grid in just to illustrate fit layout
		xtype: 'panel',
		border: false,
		frame: true,
		html:'<p><strong>Term: </strong>'+rec.get('Term')+"&nbsp;&nbsp;<strong>Year: </strong>"+rec.get('Year')+'&nbsp;&nbsp;<strong>Department: </strong>'+rec.get('Department')+"<br/>"
		    +'<strong>Type: </strong>'+rec.get('Type')+"&nbsp;&nbsp;<strong>Units: </strong>"+rec.get('Units')+'<br/>'
		    +'<strong>Description: </strong><br/><p>'+rec.get('Description')+'</p></p>'
	    }
	}).show();
    }
});