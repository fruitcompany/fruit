
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'ux');
Ext.require([
    'Ext.form.Panel',
    'Ext.ux.form.MultiSelect',
]);

Ext.onReady(function(){
    
    // Ext.create('Ext.container.Viewport', {
// 		layout: 'border',
// 		items: [msForm]
// 	});
    
    var ds = Ext.create('Ext.data.ArrayStore', {
        data: [[124,'Comp 110'],[125,'Comp 110L'],[126,'Comp 182'],[127,'Comp 182L'],
        	   [131,'Comp 282L'],[130,'Comp 282'],[129,'Math 150B'],[128,'Math 150A'],],
        fields: ['value','text'],
        sortInfo: {
            field: 'value',
            direction: 'ASC'
        }
    });

    /*
     * Ext.ux.form.MultiSelect Example Code
     */
    var msForm = Ext.widget('container', {
//         title: 'MultiSelect Test',
		semesters: 20,
//         width: 200,
//         height: 300,
// 		flex: 1,
        layout: 'hbox',
//         bodyPadding: 10,
        renderTo: 'multiselect',
        autoScroll: true,
        
              
        items:[{
            xtype: 'multiselect',
			width: 125,
			height:200,
			autoScroll:true,
			dragGroup: 'path',
			dropGroup: 'path',
            name: 'multiselect',
            id: 'multiselect-field',
            store: ds,
//             value: ['3', '4', '6'],
            ddReorder: true
        },{
            xtype: 'multiselect',
			width: 125,
			height: 200,
			autoScroll:true,
// 			layout: 'fit',
			dragGroup: 'path',
			dropGroup: 'path',
            name: 'multiselect2',
            id: 'multiselect-field2',
            store: [[124,'Comp 110'],[125,'Comp 110L'],[126,'Comp 182'],[127,'Comp 182L'],
        	   [131,'Comp 282L']],
//             value: ['3', '4', '6'],
            ddReorder: true
        }],
        
        
        /*	Functions	*/
		
    });
    
});

