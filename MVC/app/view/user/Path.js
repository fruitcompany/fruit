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

	    //me.store = Ext.data.StoreManager.lookup(me.store || 'ext-empty-store');
	    
// ------------------------------------------------------------------------------------------------------------
	
	    while(i<me.semesters){
		semester = semnms[(i+sem)%semcnt];
		semArray.push({
		    xtype	: 'semester',
		    width	: me.semesterWidth,
		    semester	: semester,
		    year	: year,
		    itemId	: semester + "_" + year + "_" + me.id,
		    id		: semester + "_" + year+"_selectfield_"+me.id,
		    listTitle	: semester + " " + year,
		    store	: []
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
	    
	    me.store.each(function(cl){
		
		var year = cl.get('Year'),
		    term = cl.get('term'),
		    semob = me.down('#' + term + "_" + year + "_" + me.id);
		
		console.log(semob);
		semob.add(cl);
	    });
	    
	    this.callParent(arguments);
	},
	
	loadData: function(data) {
	    Ext.each(data, function(rec) {
		console.log(rec);
		
	    });
	}
});