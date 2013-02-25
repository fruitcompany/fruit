Ext.define('GPAS.view.NewPath' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.newpath',
    height: 200,
    width: 400,
    layout: 'auto',
    
    items: [{
        xtype: 'combo',
        fieldLabel: 'Select Major',
        action: 'selmajor',
        value: 'Computer Science',
        store: ['Computer Science']
    },{
        xtype: 'combo',
        fieldLabel: 'Select Year',
        action: 'selyear',
        value: '2008',
        store: ['2008','2009','2010','2011','2012']
    },{
        xtype: 'combo',
        fieldLabel: 'Select Starting Semester',
        action: 'selsem',
        value: 'FALL',
        store: ['FALL','WINTER','SPRIN','SUMM']
    },{
        xtype: 'button',
        text: 'Submit',
        handler: function(button){
            var win = button.up('newpath');
            button.fireEvent('makenewpath', win,
                win.down('combo[action=selmajor]').getValue(),
                win.down('combo[action=selyear]').getValue(),
                win.down('combo[action=selsem]').getValue());
        }
    }]
});