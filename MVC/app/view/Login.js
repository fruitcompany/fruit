Ext.define('GPAS.view.Login' ,{
    extend: 'Ext.container.Viewport',
    alias : 'widget.login',
    layout: {
	type: 'border',
	padding: 5
    },		
    items: [{
	id:'horz1',
	region:'north',
	layout: {
		type:'hbox',
	},
	items: [{
		id: 'icon',
		html: '<img src="images/fruit_cup_logo_white_text.jpg" width="100">',
		region: 'west',
		border: 0,
	},{
		xtype:'tbspacer',
		flex:1
	},{
		id: 'title1',
		html: '<img src="images/4.gif" width="210" height="100">',
		region: 'center',
		border: 0,
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
	    border:0,
	    layout: {
		type:'auto',
		pack: 'center',
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
		handler: function(button) {
		    //alert('You clicked the button!');
		    console.log('Logging In...');
		    var uName = Ext.getCmp('username').getValue();
		    var pName = Ext.getCmp('password').getValue();
		    button.fireEvent('login', false, {
			'uName' : uName,
			'pName' : pName
		    });
		}
	    }],
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
		type:'auto',
		pack: 'center',
		padding: 10
	    },
	    border: 0,
	    region: 'east',
	    items: [{
		id: 'createuName',
		xtype: 'textfield',
		fieldLabel: 'Username',
		allowBlank: false
	    }, {
		id: 'createfName',
		xtype: 'textfield',
		fieldLabel: 'First Name',
		allowBlank: false
	    }, {
		id: 'createlName',
		xtype: 'textfield',
		fieldLabel: 'Last Name',
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
		handler: function(button) {
		    //console.log(button.up('panel').down('textfield'));
		    var uName  = Ext.getCmp('createuName').getValue();
		    var fName  = Ext.getCmp('createfName').getValue();
		    var lName  = Ext.getCmp('createlName').getValue();
		    var pName  = Ext.getCmp('createPassword').getValue();
		    var rpName = Ext.getCmp('createRetypePassword').getValue();
		    var eName  = Ext.getCmp('createEmail').getValue();
		    var reName = Ext.getCmp('createRetypeEmail').getValue();
		    var sName  = Ext.getCmp('createStudentID').getValue();
		    console.log('Creating User...',fName,pName,rpName,eName,reName,sName);
		    
		    button.fireEvent('login', true, {
			'fName' : fName,
			'lName' : lName,
			'pName' : pName,
			'rpName': rpName,
			'eName'	: eName,
			'reName': reName,
			'sName' : sName
		    });
		}
	    }],
	}]
    }],
    login: function(create,info){
	create = create || false;
	
	if (create) {
	    
	} else {
	    
	}
    }
});