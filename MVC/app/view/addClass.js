Ext.define('GPAS.view.addClass' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.addclass',
    height: 250,
    width: 400,
    layout: 'auto',
    Year: 2010,
    Term: "FALL",
    semStore: [],

    initComponent: function(){
        var me = this,
            tpl;
        year = me.Year;
        term = me.Term;

        me.title = "Add Class for " + term + " " + year;

//        tpl = new Ext.XTemplate(
//            '<p><b>Term: </b>{Term} &nbsp;&nbsp;&nbsp;&nbsp;<b>Year: </b>{Year}<br/>',
//			'<b>Department: </b>{Department}&nbsp;&nbsp;&nbsp;&nbsp;<b>Type: </b>{Type}&nbsp;&nbsp;&nbsp;&nbsp;<b>Units: </b>{Units}<br/>',
//			'<b>Description: </b><br/><p>{Description}</p></p>'
//		);
        me.tbar = [{
            xtype: 'combo',
            id:'selClassComb',
            fieldLabel: 'Select Class',
            //valueField: 'Class_ID',
            displayField: 'Course_Name',

            store: Ext.create('Ext.data.Store',{
                model: 'GPAS.model.Class',
                proxy: {
                    type: 'ajax',
                    url : 'app/rest.php?_m=class&_verb=read&year='+year+'&term='+term,

                    reader: {
                        type: 'json',
                        root: 'classes'
                    }
                },
                autoLoad: true
            }),
            listeners: {
                beforequery: function(e) {
                    var combo = e.combo,
                        q = e.query;
                        store = combo.getStore();
                    var patt = new RegExp(q,'i');
                    console.log(e,patt);
                    combo.expand();
                    e.cancel = true;
                    store.clearFilter();
                    store.filterBy(function(rec){
                        if(patt.test(rec.get('Course_Name') +" "+
                                     rec.get('Course_Title')+" "+
                                     rec.get('Department')  +" "+
                                     rec.get('Description'))) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                },
                select: function(combo, recs) {
                    Ext.Array.each(recs, function(record) {
                        //tpl.overwrite(combo.up('toolbar').up('window').down('panel').body, record.data);
                        combo.up('toolbar').up('window').down('panel').update(record.data);
                    });
                }
            }
        }]

        me.items = [{  // Let's put an empty grid in just to illustrate fit layout
			xtype: 'panel',
			border: false,
			autoScroll: true,
            height: '100%',
			frame: true,
            tpl: new Ext.XTemplate(
                '<p><b>{Course_Title}</b><br/></p>',
                '<p><b>Term: </b>{Term} &nbsp;&nbsp;&nbsp;&nbsp;<b>Year: </b>{Year}<br/>',
                '<b>Department: </b>{Department}&nbsp;&nbsp;&nbsp;&nbsp;<b>Type: </b>{Type}&nbsp;&nbsp;&nbsp;&nbsp;<b>Units: </b>{Units}<br/>',
                '<b>Description: </b><br/><p>{Description}</p></p>'
            ),
		}]
        this.callParent(arguments);
    },

    bbar: ['->',
        {
            xtype: 'button',
            text: 'Cancel',
            handler: function(button){
                this.up('toolbar').up('window').close()
            }
        },
        {
            xtype: 'button',
            text: 'Submit',
            handler: function(button){
                var comb = Ext.getCmp('selClassComb'),
                    win = comb.up('toolbar').up('window');
                console.log(comb.findRecordByDisplay(comb.getValue()));
                win.semStore.add(comb.findRecordByDisplay(comb.getValue()));
                win.close()
            }
        }
    ]



    //items: [{
    //    xtype: 'combo',
    //    fieldLabel: 'Select Class',
    //    store: Ext.create('Ext.data.Store',{
    //        model: 'GPAS.model.Class',
    //        proxy: {
    //            type: 'ajax',
    //            url : 'app/rest.php?_m=class&_verb=read&year='+year+'&term='+term,
    //
    //            reader: {
    //                type: 'json',
    //                root: 'classes'
    //            }
    //        },
    //        autoLoad: true
    //    })
    //},{
    //    xtype: 'button',
    //    text: 'Submit',
    //    handler: function(button){
    //
    //    }
    //}]
});