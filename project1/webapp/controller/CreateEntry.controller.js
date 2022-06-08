sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (BaseController,JSONModel,formatter,Filter,FilterOperator,MessageToast,MessageBox,) {
    "use strict";
	return BaseController.extend("com.wip2.project1.controller.CreateEntry", {
		formatter : formatter,
		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
		onInit: function() {
            debugger;
        },
        _toWorklist : function(){
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter.navTo("worklist",{},true);
        },
        _saverecord : function(){
            sap.ui.core.BusyIndicator.show(0);
             var payload = {
                 "TimeEntryID" : this.byId("in_timeentry").getValue(),
                 "JournalEntryID" : this.byId("in_jrnlid").getValue(),
                 "Description" : this.byId("in_desc").getValue(),
                 "Type" : this.byId("in_type").getValue(),
                 "PostingDate" : this.formatter.dateTimebackendwithtime(this.byId("in_pd").getValue()),
                 "DocumentDate" :  this.formatter.dateTimebackendwithtime(this.byId("in_dd").getValue()),
                 "Quantity" : this.byId("in_qlty").getValue(),
                 "Units" : this.byId("in_units").getValue(),
                 "BasePrice" : this.byId("in_bp").getValue(),
                 "NetAmount" : this.byId("in_netamnt").getValue(),
                 "Notes" : this.byId("in_notes").getValue(),
             };
             var omodelcreate = this.getOwnerComponent().getModel();
             omodelcreate.create("/YY1_WIPENTRIES",payload,{
                 success : function(odata){
                     sap.ui.core.BusyIndicator.hide();
                     debugger;
                      this._toWorklist();
             MessageToast.show("Record Created");
             this.onInit();
                 }.bind(this),
                 error : function(msg){
                     debugger;
                     sap.ui.core.BusyIndicator.hide();
                 }
             });
         },

	});

});