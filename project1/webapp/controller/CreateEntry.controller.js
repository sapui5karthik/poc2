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
           
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter.getRoute("create").attachPatternMatched(this._updateentries,this);
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
             var omodelcreateupdate = this.getOwnerComponent().getModel();
             if(this.flag){
            
                omodelcreateupdate.create("/YY1_WIPENTRIES",payload,{
                 success : function(odata){
                     
                     sap.ui.core.BusyIndicator.hide();
                     
                      this._toWorklist();
             MessageToast.show("Record Created");
             this.onInit();
                 }.bind(this),
                 error : function(msg){
                   
                     sap.ui.core.BusyIndicator.hide();
                 }
             });
            }
            else if(!this.flag){
                var eset = "/YY1_WIPENTRIES(guid'"+this.sapuuid+"')";
                omodelcreateupdate.update(eset,payload,{
                    success : function(odata){
                        this._toWorklist();
                        sap.ui.core.BusyIndicator.hide();
                       
                MessageToast.show("Record updated");
                this.onInit();
                    }.bind(this),
                    error : function(msg){
                        debugger;
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
            }
         },
         _updateentries : function(oevent){
             
             var uuid = oevent.getParameter("arguments").uuid;
             this.sapuuid = uuid;
             this.flag;
             if(uuid === "10"){
                 debugger;
                 this.flag= true;
                 this.byId("btn_save").setVisible(true);
                 this.byId("btn_edt").setVisible(false);
                 this.byId("btn_del").setVisible(false);
                 if(this.getModel("upd")!== undefined){
                    this.getModel("upd").setData(null);
                    this.getModel("upd").updateBindings(true)
                 }

                 //this.byId("").setVisible(false);
             }
             else 
             if(uuid !== "10"){
                 this.flag=false;
                 this.byId("btn_save").setVisible(false);
                 this.byId("btn_edt").setVisible(true);
                 this.byId("btn_del").setVisible(true);
                var model = this.getOwnerComponent().getModel();
                var filteruuid = new Filter("SAP_UUID",FilterOperator.EQ,uuid);
                model.read("/YY1_WIPENTRIES",{
                    filters : [filteruuid],
                    async: false,
                    success : (odata) => {
                        debugger;
                        var muuid = new JSONModel();
                        muuid.setData(odata.results[0]);
                        this.getView().setModel(muuid,"upd");
                    },
                    error: (oError) => { // oDialog.close();
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
             }

         },
         
        _updaterecord : function(){
           
            sap.ui.core.BusyIndicator.show(0);
            var SAP_UUID = this.sapuuid;
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
            var omodelupdate = this.getOwnerComponent().getModel();
            var eset = "/YY1_WIPENTRIES(guid'"+SAP_UUID+"')";
            omodelupdate.update(eset,payload,{
                success : function(odata){
                    sap.ui.core.BusyIndicator.hide();
                    debugger;
                    this._toWorklist();
                   // this.ufrag.close();
            MessageToast.show("Record updated");
            this.onInit();
                }.bind(this),
                error : function(msg){
                    debugger;
                    sap.ui.core.BusyIndicator.hide();
                }
            });
 
         },
         _deleterecord : function(oevent){
            var SAP_UUID = this.sapuuid;
			
            sap.m.MessageBox.confirm("Please confirm to delete the draft. Once deleted, it cannot be retrieved.", {
                    
                        onClose: function(oAction) {
                        if(oAction === MessageBox.Action.OK){
            var data_del = this.getOwnerComponent().getModel();
           
                var eset = "/YY1_WIPENTRIES(guid'" + SAP_UUID + "')";
                data_del.remove(eset, null,
                function() {
                    debugger;
                    //this.onInit();
                    this._toWorklist();
                	MessageToast.show("Delete success");
                }.bind(this),
                function() {
                    debugger;
                	MessageToast.show("Delete failed");
                }

            );
                        }
                        }.bind(this)
                    });
        },

	});

});