Ext.require([
    //'Ext.form.*',
    //'Ext.layout.container.Column',
    //'Ext.tab.Panel'
    '*'
]);

Ext.onReady(function() {

	Ext.create('Ext.Viewport', {
		layout: {
			type: 'border',
			padding: 5
		},		
		items: [{
				id:'horz1',
				region:'north',
				layout: {
					type:'hbox',
// 					padding: 5
				},
// 				margins: '5 0 5 5',
				items: [{
					id: 'icon',
					html: '<img src="images/fruit_cup_logo_white_text.jpg" width="100">',
					region: 'west',
// 					layout: 'fit',
					border: 0,
// 					margins: '5 0 5 5'
				},{
                	xtype:'tbspacer',
                	flex:1
                },{
					id: 'title1',
					html: '<img src="images/4.gif" width="210" height="100">',
					region: 'center',
// 					layout: 'fit',
					border: 0,
// 					margins: '0 0 70 360'
				},{
                	xtype:'tbspacer',
                	flex:1
                },{
					html: '<a href="HELP.html">Help</a>',
					region: 'east'
				}]
			}, {
				id:'horz2',
				region:'center',
				layout: {
					type:'hbox',
					pack: 'center',
					padding: 10
				},
				margins: '5 0 5 5',
				items: [{
					id: 'login',
					xtype: 'panel',
					layout: {
						type:'vbox',
						pack: 'start',
						padding: 10
					},
					region: 'west',
					items: [{
						id: 'username',
						xtype: 'textfield',
						fieldLabel: 'Username',
						allowBlank: false
					}, {
						id: 'password',
						xtype: 'textfield',
						inputType: 'password',
						fieldLabel: 'Password'
					},{
						id: 'login_button',
						xtype: 'button',
						text: 'Login',
						handler: function() {
							alert('You clicked the button!');
							console.log('Logging In...');
							var uName = Ext.getCmp('username');
							var pName = Ext.getCmp('password');
							console.log(uName.getValue() + ", " + pName.getValue());
						}
					}],
					border: 0
				}, {
					id: 'divider',
					html: '<img src="images/divider.jpg" width="10" height="300">',
					region: 'center',
					layout: 'fit',
					border: 0,
					margins: '5 25 5 25'
				}, {
					id: 'createAccount',			
					layout: {
						type:'vbox',
						pack: 'center',
						padding: 10
					},
					region: 'east',
					items: [{
						id: 'createUsername',
						xtype: 'textfield',
						fieldLabel: 'Username',
						allowBlank: false
					}, {
						id: 'createPassword',
						xtype: 'textfield',
						inputType: 'password',
						fieldLabel: 'Password'
					}, {
						id: 'createRetypePassword',
						xtype: 'textfield',
						inputType: 'password',
						fieldLabel: 'Retype Password'
					},	{
						id: 'createRetypePassword',
						xtype: 'textfield',
						inputType: 'password',
						fieldLabel: 'Retype Password'
					}, {
						id: 'createEmail',
						xtype: 'textfield',
						inputType: 'email',
						fieldLabel: 'Email'
					}, {
						id: 'createRetypeEmail',
						xtype: 'textfield',
						inputType: 'email',
						fieldLabel: 'Retype Email'
					}, {
						id: 'createStudentID',
						xtype: 'textfield',
						inputType: 'number',
						fieldLabel: 'Student ID'
					}, {
						id: 'create_button',
						xtype: 'button',
						text: 'Create Account',
						handler: function() {
							alert('You clicked the button!');
							console.log('Creating User...');
							var uName  = Ext.getCmp('createUsername');
							var pName  = Ext.getCmp('createPassword');
							var rpName = Ext.getCmp('createRetypePassword');
							var eName  = Ext.getCmp('createEmail');
							var reName = Ext.getCmp('createRetypeEmail');
							var sName  = Ext.getCmp('createStudentID');
							var str    = escape(uName.getValue()) + "&" + escape(pName.getValue()) + "&" + 
							             escape(rpName.getValue()) + "&" + escape(eName.getValue()) + "&" + 
											 escape(reName.getValue()) + "&" + escape(sName.getValue()); 
							window.location="../MainPage/index.html?" + str;
						}
					}],
					border: 0
				}]
			}],
		renderTo: Ext.getBody()
    });
    //viewport.render(document.body);

	//viewport.renderTo(document.body);
});
	   	   
	   
	   // {
			// region:'center',
			// margins: '5 5 5 0',
			// layout: 'anchor',
			// items:[{
				// anchor: '100%',
				// baseCls:'x-plain',
				// layout: {
					// type:'hbox',
					// padding: 10
				// },
				// defaults:{
					// margins:'0 5 0 0',
					// pressed: false,
					// toggleGroup:'btns',
					// allowDepress: false
				// },
				// items: [{
					// xtype:'button',
					// text: 'Spaced / Align: left',
					// handler: function(){
						// replace({
							// layout: {
								// type:'vbox',
								// padding:'5',
								// align:'left'
							// },
							// defaults:{margins:'0 0 5 0'},
							// items:[{
								// xtype:'button',
								// text: 'Button 1'
							// },{
								// xtype:'tbspacer',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 2'
							// },{
								// xtype:'button',
								// text: 'Button 3'
							// },{
								// xtype:'button',
								// text: 'Button 4',
								// margins:'0'
							// }]
						// }, 'spaced');
					// }
				// },{
					// xtype:'button',
					// text: 'Multi-Spaced / Align: left',
					// handler: function(){
						// replace({
							// layout: {
								// type:'vbox',
								// padding:'5',
								// align:'left'
							// },
							// defaults:{margins:'0 0 5 0'},
							// items:[{
								// xtype:'button',
								// text: 'Button 1'
							// },{
								// xtype:'tbspacer',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 2'
							// },{
								// xtype:'tbspacer',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 3'
							// },{
								// xtype:'tbspacer',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 4',
								// margins:'0'
							// }]
						// }, 'multi spaced - align left');
					// }
				// },{
					// xtype:'button',
					// text: 'Align: left',
					// handler: function(){
						// replace({
							// layout: {
								// type:'vbox',
								// padding:'5',
								// align:'left'
							// },
							// defaults:{margins:'0 0 5 0'},
							// items:[{
								// xtype:'button',
								// text: 'Button 1'
							// },{
								// xtype:'button',
								// text: 'Button 2'
							// },{
								// xtype:'button',
								// text: 'Button 3'
							// },{
								// xtype:'button',
								// text: 'Button 4'
							// }]
						// }, 'align left');
					// }
				// },{
					// xtype:'button',
					// text: 'Align: center',
					// handler: function(){
						// replace({
							// layout: {
								// type:'vbox',
								// padding:'5',
								// align:'center'
							// },
							// defaults:{margins:'0 0 5 0'},
							// items:[{
								// xtype:'button',
								// text: 'Button 1'
							// },{
								// xtype:'button',
								// text: 'Button 2'
							// },{
								// xtype:'button',
								// text: 'Button 3'
							// },{
								// xtype:'button',
								// text: 'Button 4'
							// }]
						// }, 'align center');
					// }
				// },{
					// xtype:'button',
					// text: 'Align: stretch',
					// handler: function(){
						// replace({
							// layout: {
								// type:'vbox',
								// padding:'5',
								// align:'stretch'
							// },
							// defaults:{margins:'0 0 5 0'},
							// items:[{
								// xtype:'button',
								// text: 'Button 1'
							// },{
								// xtype:'button',
								// text: 'Button 2'
							// },{
								// xtype:'button',
								// text: 'Button 3'
							// },{
								// xtype:'button',
								// text: 'Button 4'
							// }]
						// }, 'align stretch');
					// }
				// },{
					// xtype:'button',
					// text: 'Align: stretchmax',
					// handler: function(){
						// replace({
							// layout: {
								// type:'vbox',
								// padding:'5',
								// align:'stretchmax'
							// },
							// defaults:{margins:'0 0 5 0'},
							// items:[{
								// xtype:'button',
								// text: 'Jamie'
							// },{
								// xtype:'button',
								// text: 'Aaron'
							// },{
								// xtype:'button',
								// text: 'Tommy'
							// },{
								// xtype:'button',
								// text: 'Ed '
							// }]
						// }, 'align stretchmax');
					// }
				// }]
			// },{
				// anchor: '100%',
				// baseCls:'x-plain',
				// layout: {
					// type:'hbox',
					// padding: '0 10 10'
				// },
				// defaults:{
					// margins:'0 5 0 0',
					// pressed: false,
					// toggleGroup:'btns',
					// allowDepress: false
				// },
				// items: [{
					// xtype:'button',
					// text: 'Flex: Even / Align: center',
					// handler: function(){
						// replace({
							// layout: {
								// type:'vbox',
								// padding:'5',
								// align:'center'
							// },
							// defaults:{margins:'0 0 5 0'},
							// items:[{
								// xtype:'button',
								// text: 'Button 1',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 2',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 3',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 4',
								// flex:1,
								// margins:'0'
							// }]
						// }, 'align flex even');
					// }
				// },{
					// xtype:'button',
					// text: 'Flex: Ratio / Align: center',
					// handler: function(){
						// replace({
							// layout: {
								// type:'vbox',
								// padding:'5',
								// align:'center'
							// },
							// defaults:{margins:'0 0 5 0'},
							// items:[{
								// xtype:'button',
								// text: 'Button 1',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 2',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 3',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 4',
								// flex:3,
								// margins:'0'
							// }]
						// }, 'align flex ratio');
					// }
				// },{
					// xtype:'button',
					// text: 'Flex + Stretch',
					// handler: function(){
						// replace({
							// layout: {
								// type:'vbox',
								// padding:'5',
								// align:'stretch'
							// },
							// defaults:{margins:'0 0 5 0'},
							// items:[{
								// xtype:'button',
								// text: 'Button 1',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 2',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 3',
								// flex:1
							// },{
								// xtype:'button',
								// text: 'Button 4',
								// flex:3,
								// margins:'0'
							// }]
						// }, 'align flex + stretch');
					// }
				// },{
					// xtype:'button',
					// text: 'Pack: start / Align: center',
					// handler: function(){
						// replace({
							// layout: {
								// type:'vbox',
								// padding:'5',
								// pack:'start',
								// align:'center'
							// },
							// defaults:{margins:'0 0 5 0'},
							// items:[{
								// xtype:'button',
								// text: 'Button 1'
							// },{
								// xtype:'button',
								// text: 'Button 2'
							// },{
								// xtype:'button',
								// text: 'Button 3'
							// },{
								// xtype:'button',
								// text: 'Button 4'
							// }]
						// }, 'align pack start + align center');
					// }
				// },{
					// xtype:'button',
					// text: 'Pack: center / Align: center',
					// handler: function(){
						// replace({
							// layout: {
								// type:'vbox',
								// padding:'5',
								// pack:'center',
								// align:'center'
							// },
							// defaults:{margins:'0 0 5 0'},
							// items:[{
								// xtype:'button',
								// text: 'Button 1'
							// },{
								// xtype:'button',
								// text: 'Button 2'
							// },{
								// xtype:'button',
								// text: 'Button 3'
							// },{
								// xtype:'button',
								// text: 'Button 4',
								// margins:'0'
							// }]
						// }, 'align pack center + align center');
					// }
				// },{
					// xtype:'button',
					// text: 'Pack: end / Align: center',
					// handler: function(){
						// replace({
							// layout: {
								// type:'vbox',
								// padding:'5',
								// pack:'end',
								// align:'center'
							// },
							// defaults:{margins:'0 0 5 0'},
							// items:[{
								// xtype:'button',
								// text: 'Button 1'
							// },{
								// xtype:'button',
								// text: 'Button 2'
							// },{
								// xtype:'button',
								// text: 'Button 3'
							// },{
								// xtype:'button',
								// text: 'Button 4',
								// margins:'0'
							// }]
						// }, 'align pack end + align center');
					// }
				// }]
			// }]
		// }]
	// });
// });