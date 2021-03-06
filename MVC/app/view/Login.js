var innerHTML = ([
    '<div id="container">',
      '<div id="masthead">',
          '<div id="fruitcup"><img alt="" height="75" src="images/fruit_cup_transparent.png" width="87" /></div>',
          '<div id="support"><p>IT Support (555) 677-1400</p></div>',
          '<div id="gpas"><img alt="" height="150" src="images/finalGPASLogo.png" width="400" /></div>',
      '</div>',
      '<div id="navigation">',
          '<ul>',
              '<li><a href="index.html">Logout</a></li>',
              //'<li><a href="../account_manager/index.html">Schedule</a></li>',
              '<li><a href="faq/default.html">Help</a></li>',
              //'<li><a href="admin_panel/default.html">Admin</a></li>',
          '</ul>',
      '</div>',
    '</div>'
]);

Ext.define('GPAS.view.Login', {
    extend: 'Ext.container.Viewport',
    alias : 'widget.login',
    layout: {
	//type: 'border',
	//padding: 5
    },
    items: [
        {
	        id:'horz1',
	        region:'north',
	        height: 180,
	        //margins: '5 5 5 5',

	        items:[
                {
                    html: innerHTML
                }]
        },
    {
	id:'horz2',
	region:'center',
	layout: {
	    type: 'hbox',
	    pack:'center',
	    align:'middle'
	},

	//margins: '5 0 0 0',
	items: [{
	    id: 'login',
	    xtype: 'panel',
	    border:0,
	    layout: {
		type:'auto',
		//pack: 'center',
		padding: 10,
		align:'right',
	    },
	    height: 350,
	    width: 361,
	    region: 'west',
	    items: [{
		id: 'loginMessage',
		xtype: 'label',
		text: 'Already have an account? Login Here!',
		margins: '5 0 25 0',
		style: {
			'font-size': '20px'
		}
	    }, {
		id: 'username',
		xtype: 'textfield',
		fieldLabel: 'Username',
		allowBlank: false
	    }, {
		id: 'password',
		xtype: 'textfield',
		inputType: 'password',
		fieldLabel: 'Password'
	    }, {
		id: 'login_button',
		xtype: 'button',
		text: 'Login',
		handler: function(button) {
		    //alert('You clicked the button!');
		    console.log('Logging In...');
		    var uName = Ext.getCmp('username').getValue();
		    var pName = Ext.getCmp('password').getValue();
		    button.fireEvent('login', false, {
			'User_Name' : uName,
			'Password' : pName
		    });
		}
	    }],
	}, {
	    id: 'divider',
	    html: '<img src="images/divider.jpg" width="10" height="500">',
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
	    height: 350,
	    width: 361,
	    border: 0,
	    region: 'east',
	    items: [{
		id: 'createMessage',
		xtype: 'label',
		text: 'First time to the site? Create an account!',
		margins: '5 0 25 0',
		style: {
		    'font-size': '20px'
		}
	}, {
		id: 'createuName',
		xtype: 'textfield',
		fieldLabel: 'Username',
		checkChangeBuffer: 1000,
		store: Ext.data.StoreManager.lookup('Users'),
		//allowBlank: false,
		validator: function(val){
		    var valid, me = this;
		    if(Ext.data.StoreManager.lookup('Users').find('User_Name',val)==-1){
				return true;
			} else {
				return 'This user name has already been used.';
			}
		}
	}, {
		id: 'createfName',
		xtype: 'textfield',
		fieldLabel: 'First Name',
		checkChangeBuffer: 1000,
		allowBlank: false
	}, {
		id: 'createlName',
		xtype: 'textfield',
		fieldLabel: 'Last Name',
		checkChangeBuffer: 1000,
		allowBlank: false
	}, {
		id: 'createPassword',
		xtype: 'textfield',
		inputType: 'password',
		fieldLabel: 'Password',
		checkChangeBuffer: 1000,
		allowBlank: false
	}, {
		id: 'createRetypePassword',
		xtype: 'textfield',
		inputType: 'password',
		fieldLabel: 'Retype Password',
		allowBlank: false,
		checkChangeBuffer: 1000,
		validator:function(val){
		    return Ext.getCmp('createPassword').getValue() == val ? true : "Passwords do not match";
		}
	}, {
		id: 'createEmail',
		xtype: 'textfield',
		inputType: 'email',
		fieldLabel: 'Email',
		checkChangeBuffer: 1000,
		allowBlank: false
    }, {
		id: 'createRetypeEmail',
		xtype: 'textfield',
		inputType: 'email',
		fieldLabel: 'Retype Email',
		checkChangeBuffer: 1000,
		allowBlank: false,
		validator:function(val){
		    return Ext.getCmp('createEmail').getValue() == val ? true : "Email addresses do not match";
		}
	}, {
		id: 'createStudentID',
		xtype: 'textfield',
		inputType: 'number',
		fieldLabel: 'Student ID',
		checkChangeBuffer: 1000,
		store: 'Users',
		//allowBlank: false,
		validator: function(val){
		    var valid, me = this;
		    if(Ext.data.StoreManager.lookup('Users').find('User_Name',val)==-1){
				return true;
			} else {
				return 'This ID has already been used.';
			}
		}
	}, {
		id: 'create_button',
		xtype: 'button',
		disabled: true,
		text: 'Create Account',
		handler: function(button) {
		    //console.log(button.up('panel').down('textfield'));
		    var uName  = Ext.getCmp('createuName');
		    var fName  = Ext.getCmp('createfName');
		    var lName  = Ext.getCmp('createlName');
		    var pName  = Ext.getCmp('createPassword');
		    var rpName = Ext.getCmp('createRetypePassword');
		    var eName  = Ext.getCmp('createEmail');
		    var reName = Ext.getCmp('createRetypeEmail');
		    var sName  = Ext.getCmp('createStudentID');
		    if(uName.isValid() && fName.isValid() && lName.isValid() && pName.isValid() &&
		       rpName.isValid() && eName.isValid() && reName.isValid() && sName.isValid()){
			console.log('Creating User...',fName,pName,rpName,eName,reName,sName);

			button.fireEvent('login', true, {
			    'User_Name'  : uName.getValue(),
			    'First_Name' : fName.getValue(),
			    'Last_Name'  : lName.getValue(),
			    'Password'   : pName.getValue(),
			    'Email' 	 : eName.getValue(),
			    'Student_ID' : sName.getValue()
			});
		    }
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