
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
    
    var ds =  [[124,'Comp 110'],[125,'Comp 110L'],[126,'Comp 182'],[127,'Comp 182L'],
        	   [131,'Comp 282L'],[130,'Comp 282'],[129,'Math 150B'],[128,'Math 150A'],
        	   [132,'Title 5 req'],[133,'GE Basic'],[134,'Comp 122'],[135,'Phil 230'],
        	   [136,'Elective'],[137,'Comp 222'],[138,'Comp 256'],[139,'Comp 256L'],
        	   [140,'Title 5 req'],[141,'GE Basic'],[142,'Comp 333'],[143,'Comp 322'],
        	   [144,'Comp 322L'],[145,'LDSER A'],[146,'Math 262'],[147,'Comp 310'],
        	   [148,'Comp 380'],[149,'Comp 380L'],[150,'LDSER A'],[151,'GE Art Hum'],
        	   [152,'GE Comp Cult'],[153,'Comp UDE'],[154,'Comp UDE'],[155,'Math 341'],
        	   [156,'LDSER B'],[157,'GE Soc Sci'],[158,'Comp 490'],[159,'Comp 490L'],
        	   [160,'Comp UDE'],[161,'Comp UDE'],[162,'Math 482'],[163,'GE UD Soc Sci'],
        	   [164,'Comp 491L'],[165,'Comp UDE'],[166,'GE UD Art Hum'],[167,'GE UD Com Cult'],[168,'Elective']];

    /*
     * Ext.ux.form.MultiSelect Example Code
     */
    var msForm = Ext.widget('container', {
//         title: 'MultiSelect Test',
		semesters: 11,
//         width: 200,
//         height: 300,
// 		flex: 1,
        layout: 'hbox',
//         bodyPadding: 10,
        renderTo: 'multiselect',
        autoScroll: true,
        
        listeners:{
        	afterrender:function(me){
        		console.log("rendered");
        		var i = 0, semArray = [];
			
				while(i<me.semesters){
// 					semArray.push({
					me.add({
						xtype: 'multiselect',
						width: 125,
						dragGroup: 'path',
						dropGroup: 'path',
						name: 'multiselect-'+i,
						id: 'multiselect-field-'+i,
						listTitle: 'Semester '+(i+1),
						store: [ds.pop(),ds.pop(),ds.pop(),ds.pop()], //blank store to begin
	// 					listeners: {
	// 						boundList: {
	// 							itemdblclick: me.onItemDblClick,
	// 							scope: me
	// 						}
	// 					}
					});
					i++;
				}
				
				
				console.log(semArray);
// 				return semArray;
				
        	}
        },
              
//         items:[{
//             xtype: 'multiselect',
// 			width: 125,
// 			height:200,
// 			autoScroll:true,
// 			dragGroup: 'path',
// 			dropGroup: 'path',
//             name: 'multiselect',
//             id: 'multiselect-field',
//             store: [[130,'Comp 282'],[129,'Math 150B'],[128,'Math 150A']],
// //             value: ['3', '4', '6'],
//             ddReorder: true
//         },{
//             xtype: 'multiselect',
// 			width: 125,
// 			height: 200,
// 			autoScroll:true,
// // 			layout: 'fit',
// 			dragGroup: 'path',
// 			dropGroup: 'path',
//             name: 'multiselect2',
//             id: 'multiselect-field2',
//             store: [[124,'Comp 110'],[125,'Comp 110L'],[126,'Comp 182'],[127,'Comp 182L'],
//         	   [131,'Comp 282L']],
// //             value: ['3', '4', '6'],
//             ddReorder: true
//         }],
        
        
        /*	Functions	*/
		
    });
    
});

