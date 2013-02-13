
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'ux');
Ext.require([
    'Ext.container.Viewport',
    'Ext.ux.form.MultiSelect',
    'Ext.data.Store'
]);

Ext.define('Course', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'c_name', 	type: 'string',	mapping:'Class name'},
		{name: 'dept',  	type: 'string',	mapping:'Department'},
		{name: 'c_title',   type: 'string',	mapping:'Course Title'},
		{name: 'desc',  	type: 'string',	mapping:'Description'},
		{name: 'unit',  	type: 'number',	mapping:'Unit'},
		{name: 'type',  	type: 'string',	mapping:'Type'}
	]
});

Ext.onReady(function(){

	var CourseStore = Ext.create('Ext.data.Store', {
		model: 'Course',
		proxy: {
			type: 'ajax',
			url : 'Course_Info.json',
			reader: {
				type: 'json',
				root: 'courses'
			}
		},
		autoLoad: true
	});
	
	console.log(CourseStore);
    
    
    // var ds =  [[124,'Comp 110'],[125,'Comp 110L'],[126,'Comp 182'],[127,'Comp 182L'],
//         	   [131,'Comp 282L'],[130,'Comp 282'],[129,'Math 150B'],[128,'Math 150A'],
//         	   [132,'Title 5 req'],[133,'GE Basic'],[134,'Comp 122'],[135,'Phil 230'],
//         	   [136,'Elective'],[137,'Comp 222'],[138,'Comp 256'],[139,'Comp 256L'],
//         	   [140,'Title 5 req'],[141,'GE Basic'],[142,'Comp 333'],[143,'Comp 322'],
//         	   [144,'Comp 322L'],[145,'LDSER A'],[146,'Math 262'],[147,'Comp 310'],
//         	   [148,'Comp 380'],[149,'Comp 380L'],[150,'LDSER A'],[151,'GE Art Hum'],
//         	   [152,'GE Comp Cult'],[153,'Comp UDE'],[154,'Comp UDE'],[155,'Math 341'],
//         	   [156,'LDSER B'],[157,'GE Soc Sci'],[158,'Comp 490'],[159,'Comp 490L'],
//         	   [160,'Comp UDE'],[161,'Comp UDE'],[162,'Math 482'],[163,'GE UD Soc Sci'],
//         	   [164,'Comp 491L'],[165,'Comp UDE'],[166,'GE UD Art Hum'],[167,'GE UD Com Cult'],[168,'Elective']];


     var ds =  [['Comp 110'],['Comp 110L'],['Comp 182'],['Comp 182L'],
        	   ['Comp 282L'],['Comp 282'],['Math 150B'],['Math 150A'],
        	   ['Title 5 req'],['GE Basic'],['Comp 122'],['Phil 230'],
        	   ['Elective'],['Comp 222'],['Comp 256'],['Comp 256L'],
        	   ['Title 5 req'],['GE Basic'],['Comp 333'],['Comp 322'],
        	   ['Comp 322L'],['LDSER A'],['Math 262'],['Comp 310'],
        	   ['Comp 380'],['Comp 380L'],['LDSER A'],['GE Art Hum'],
        	   ['GE Comp Cult'],['Comp UDE'],['Comp UDE'],['Math 341'],
        	   ['LDSER B'],['GE Soc Sci'],['Comp 490'],['Comp 490L'],
        	   ['Comp UDE'],['Comp UDE'],['Math 482'],['GE UD Soc Sci'],
        	   ['Comp 491L'],['Comp UDE'],['GE UD Art Hum'],['GE UD Com Cult'],['Elective']];

    /*
     * Ext.ux.form.MultiSelect Example Code
     */
    var msForm = Ext.widget('panel', {
//         title: 'MultiSelect Test',
		semesters: 1,
//         width: 200,
//         height: 300,
// 		flex: 1,
        layout: 'hbox',
//         bodyPadding: 10,
//         renderTo: 'multiselect',
		region: 'north',
        autoScroll: true,
        
        listeners:{
        	beforerender: function(me){
        		console.log("rendered");
        		var i = 0, semArray = [];
			
				while(i<me.semesters){
// 					semArray.push({
					me.add({
						xtype: 'multiselect',
						width: 125,
						displayField: 'field1',
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
					me.add({
						xtype: 'panel',
						layout: 'fit',
						items: [{
							xtype	: 'button',
							text	: 'Add Semester',
							handler : function(butt){
								me.semesters++,
								me.insert(me.semesters-1,{
									xtype: 'multiselect',
									width: 125,
									displayField: 'field1',
									dragGroup: 'path',
									dropGroup: 'path',
									name: 'multiselect-'+me.semesters-1,
									id: 'multiselect-field-'+me.semesters-1,
									listTitle: 'Semester '+(me.semesters),
									store: [], //blank store to begin
				// 					listeners: {
				// 						boundList: {
				// 							itemdblclick: me.onItemDblClick,
				// 							scope: me
				// 						}
				// 					}
								});
							}
						},{
							xtype	: 'button',
							text	: 'Test stuff',
							handler : function(butt){
								console.log(me);
							}
						}]	
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
    
    var vp = Ext.create('Ext.container.Viewport', {
// 		layout: 'border',
		autoscroll: true,
		items: [msForm],
		renderTo: 'multiselect',
	});
    
    
    
});

