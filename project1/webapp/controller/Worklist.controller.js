sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    'sap/base/util/deepExtend'
], function (BaseController, JSONModel, formatter, Filter, FilterOperator,MessageToast,MessageBox,deepExtend) {
    "use strict";

    return BaseController.extend("com.wip2.project1.controller.Worklist", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */
       
        onInit : function(){
          

           
                        
            if(this.byId("timeentrysearch").getValue() !== ""){
                this.byId("timeentrysearch").setValue();
            }
            if(this.byId("descsearch").getValue() !== ""){
                this.byId("descsearch").setValue();
            }
            
            if(this.byId("postdate").getValue() !== ""){
                this.byId("postdate").setValue();
            }
            if(this.byId("jrnlentry").getValue() !== ""){
                this.byId("jrnlentry").setValue();
            }
            if(this.byId("docdate").getValue() !== ""){
                this.byId("docdate").setValue();
            }
            if(this.byId("typesearch").getValue() !== ""){
                this.byId("typesearch").setValue();
            }
            sap.ui.core.BusyIndicator.show(0);
            var omodelwipread = this.getOwnerComponent().getModel();
           
            omodelwipread.read("/YY1_WIPENTRIES",{
              
                success : function(odata){
                 
                    var jsonmodel = new JSONModel();
                    jsonmodel.setData(odata.results);
                   
                    this.getView().byId("table").setModel(jsonmodel,"wip");
                    this.getView().byId("innertable").setModel(jsonmodel,"wip1");
                    
                    sap.ui.core.BusyIndicator.hide();
                }.bind(this),
                error : function(msg){
                    sap.ui.core.BusyIndicator.hide();

                }
            });

            
        },
        _addrow : function(){
            debugger;
           this.columnListItemNewLine = new sap.m.ColumnListItem({
			
                    cells: [
                        new sap.m.RadioButton({visible:false}),
                        new sap.m.Input({ type: "Text", value: "TimeEntryID",width:"auto"}),
                        new sap.m.Input({ type: "Text", value: "JournalEntryID",width:"auto"}),
                        new sap.m.Input({ type: "Text", value: "Description",width:"auto"}),
                        new sap.m.Input({ value: "Type",width:"auto"}),
                        new sap.m.Input({ value: "Type Text",width:"auto"}),
                        new sap.m.DatePicker({ value: "Posting Date",width:"auto"}),
                        new sap.m.DatePicker({ value: "Document Date",width:"auto"}),
                        new sap.m.Input({ value: "Quantity",width:"auto"}),
                        new sap.m.Input({ value: "Units",width:"auto"}),
                        new sap.m.Input({ value: "BasePrice",width:"auto"}),
                        new sap.m.Input({ value: "Net Amount",width:"auto"}),
                        new sap.m.Input({ value: "Notes",width:"auto"})

                        ]
			});
            this._oTable = this.byId("table");
     
            this._oTable.addItem(this.columnListItemNewLine);

        },
        _remove : function(){
            
        this._oTable.removeItem(this.columnListItemNewLine);
        this.onInit();

        },
      
          // CUSTOM CODE : Developer: Suman Venkatapuram for Chappota.com
        onBeforeRebindTable: function (oEvent) {
            
                
            // var oBindingParams = oEvent.getParameter("bindingParams");
            // oBindingParams.filters.push(new Filter("TimeEntryID", "EQ", "200"));
            // oBindingParams.parameters.select = oBindingParams.parameters.select + ",TimeEntryID";

			// var mBindingParams = oEvent.getParameter("bindingParams");
            // var filters1 = new Filter("BasePrice",FilterOperator.LE,"500");
            // mBindingParams.filters.push(filters1);

			// var oMultiComboBox = this.getView().byId("multiComboBox");
			// var aCountKeys = oMultiComboBox.getSelectedKeys();
			// for (var i = 0; i < aCountKeys.length; i++) {
			// 	var newFilter = new Filter("Count", FilterOperator.EQ, aCountKeys[i]);
			// 	if (aCountKeys.length > 0) {
			// 		mBindingParams.filters.push(newFilter);
			// 	}
			// }
		},
		onAfterVariantLoad: function(oEvent) {
			if (this._smartFilterBar) {

				var oData = this._smartFilterBar.getFilterData();
				var oCustomFieldData = oData["_CUSTOM"];
				// if (oCustomFieldData) {

				// 	var oCtrl = this.getView().byId("multiComboBox");

				// 	if (oCtrl) {
				// 		oCtrl.setSelectedKeys(oCustomFieldData.MyOwnFilterField);
				// 	}
				// }
			}
		},

		onBeforeVariantSave: function(oEvent) {
			this._updateCustomFilter();
		},

		onBeforeVariantFetch: function() {
			this._updateCustomFilter();
		},
        _updateCustomFilter: function() {
			// if (this._smartFilterBar) {

			// 	var oCtrl = this.getView().byId("multiComboBox");

			// 	if (oCtrl) {
			// 		this._smartFilterBar.setFilterData({
			// 			_CUSTOM: {
			// 				MyOwnFilterField: oCtrl.getSelectedKeys()
			// 			}
			// 		});
			// 	}
			// }
		},
 reusablecreateupdate : function(){
                //com.chappota.wipprojectsalesreport
                sap.ui.core.BusyIndicator.show(0);
                if(!this.cufrag){
                    this.cufrag = sap.ui.xmlfragment(this.getView().getId(),"com.wip2.project1.fragments.Create",this);
                    this.getView().addDependent(this.cufrag);
                }
                
                var omodelwipread = this.getOwnerComponent().getModel();
                omodelwipread.read("/YY1_WIPENTRIES",{
                    success : function(odata){
                        debugger;
                        this.cufrag.open();
                        for(var i=0;i<odata.results.length;++i){
                            var timeentry = parseInt(odata.results[i].TimeEntryID);
                           

                            var jrnlentryid = parseInt(odata.results[i].JournalEntryID);
                            

                            
                        }
                        this.byId("in_timeentry").setValue(timeentry+1);
                        this.byId("in_jrnlid").setValue(jrnlentryid+1);
                        sap.ui.core.BusyIndicator.hide();
                    }.bind(this),
                    error : function(msg){
                        sap.ui.core.BusyIndicator.hide();

                    }
                });
        },
        _CloseCUFrag : function(){
            this.cufrag.close();
        },

        // Create new record
        _createpress : function(oevent){
            
            //oevent.getParameter("pressed");
            this.reusablecreateupdate();
        },
        _editpress : function(oevent){
            
            var radiosel = this.byId("updaterad");
            var radiosel = this.byId("updaterad1");
            let state = oevent.getParameter("pressed");
            if(state){
                this.byId("idseledit").setVisible(true);
                this.byId("idseledit1").setVisible(true);
            }
            if(!state){
                this.byId("idseledit").setVisible(false);
                this.byId("idseledit1").setVisible(false);
            }
        },
        _deletepress : function(oevent){
            let state = oevent.getParameter("pressed");
            if(state){
                this.byId("idseldel").setVisible(true);
            }
            if(!state){
                this.byId("idseldel").setVisible(false);
            }
        },
        _rowedit : function(oevent){
            if(oevent.getParameter("selected")){
                if(!this.ufrag){
                    this.ufrag = sap.ui.xmlfragment(this.getView().getId(),"com.wip2.project1.fragments.Update",this);
                    this.getView().addDependent(this.ufrag);
                }
                this.ufrag.open();

                var bc = oevent.getSource().getBindingContext("wip").getProperty("");
                debugger;
                
                this.byId("id_uuid1").setValue(bc.SAP_UUID);
                this.byId("in_timeentry1").setValue(bc.TimeEntryID);
                this.byId("in_jrnlid1").setValue(bc.JournalEntryID);
                this.byId("in_desc1").setValue(bc.Description);
                this.byId("in_type1").setValue(bc.Type);
                this.byId("in_pd1").setValue(this.formatter.dateDisplay(bc.PostingDate));
                this.byId("in_dd1").setValue(this.formatter.dateDisplay(bc.DocumentDate));
                this.byId("in_qlty1").setValue(bc.Quantity);
                this.byId("in_units1").setValue(bc.Units);
                this.byId("in_bp1").setValue(bc.BasePrice);
                this.byId("in_netamnt1").setValue(bc.NetAmount);
                this.byId("in_notes1").setValue(bc.Notes);


            }
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
                     this.cufrag.close();
            MessageToast.show("Record Created");
            this.onInit();
                }.bind(this),
                error : function(msg){
                    debugger;
                    sap.ui.core.BusyIndicator.hide();
                }
            });
        },
        _updaterecord : function(){
           
           sap.ui.core.BusyIndicator.show(0);
           var SAP_UUID = this.byId("id_uuid1").getValue();
            var payload = {
                
                "TimeEntryID" : this.byId("in_timeentry1").getValue(),
                "JournalEntryID" : this.byId("in_jrnlid1").getValue(),
                "Description" : this.byId("in_desc1").getValue(),
                "Type" : this.byId("in_type1").getValue(),
                "PostingDate" : this.formatter.dateTimebackendwithtime(this.byId("in_pd1").getValue()),
                "DocumentDate" :  this.formatter.dateTimebackendwithtime(this.byId("in_dd1").getValue()),
                "Quantity" : this.byId("in_qlty1").getValue(),
                "Units" : this.byId("in_units1").getValue(),
                "BasePrice" : this.byId("in_bp1").getValue(),
                "NetAmount" : this.byId("in_netamnt1").getValue(),
                "Notes" : this.byId("in_notes1").getValue(),
            };
           var omodelupdate = this.getOwnerComponent().getModel();
           var eset = "/YY1_WIPENTRIES(guid'"+SAP_UUID+"')";
           omodelupdate.update(eset,payload,{
               success : function(odata){
                   sap.ui.core.BusyIndicator.hide();
                   debugger;
                   this.ufrag.close();
           MessageToast.show("Record updated");
           this.onInit();
               }.bind(this),
               error : function(msg){
                   debugger;
                   sap.ui.core.BusyIndicator.hide();
               }
           });

        },
        _CloseUFrag: function(){
            this.ufrag.close();
        },
        _deleterecord : function(oevent){
            var SAP_UUID = oevent.getSource().getBindingContext("wip").getProperty("SAP_UUID");
			
            sap.m.MessageBox.confirm("Please confirm to delete the draft. Once deleted, it cannot be retrieved.", {
                    
                        onClose: function(oAction) {
                        if(oAction === MessageBox.Action.OK){
            var data_del = this.getOwnerComponent().getModel();
           
                var eset = "/YY1_WIPENTRIES(guid'" + SAP_UUID + "')";
                data_del.remove(eset, null,
                function() {
                    debugger;
                    this.onInit();
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

        //filters
        _localmethodforfilters : function(filters){
            debugger;
            var omodelwipread = this.getOwnerComponent().getModel();
           // var filters = new Filter(filter1key,FilterOperator.EQ,filtervalue);
            omodelwipread.read("/YY1_WIPENTRIES",{
                filters : [filters],
                success : function(odata){
                    debugger;
                    var jsonmodel = new JSONModel();
                    jsonmodel.setData(odata.results);
                   
                    this.getView().byId("table").setModel(jsonmodel,"wip");
                    
                    sap.ui.core.BusyIndicator.hide();
                }.bind(this),
                error : function(msg){
                    sap.ui.core.BusyIndicator.hide();

                }
            });
        },

        _timeentrysearch : function(oevent){
            var filters = new Filter("TimeEntryID",FilterOperator.EQ,oevent.getParameter("value"));
            this._localmethodforfilters(filters);
        },
        _descsearch : function(oevent){
            var filters = new Filter("Description",FilterOperator.Contains,oevent.getParameter("value"));
            this._localmethodforfilters(filters);
        },
        _postdate: function(oevent){
            var filters = new Filter("PostingDate",FilterOperator.EQ,oevent.getParameter("value"));
            this._localmethodforfilters(filters);
        },

        _journalentrysearch: function(oevent){
            var filters = new Filter("JournalEntryID",FilterOperator.EQ,oevent.getParameter("value"));
            this._localmethodforfilters(filters);
        },
        _docdate: function(oevent){
            var filters = new Filter("DocumentDate",FilterOperator.EQ,oevent.getParameter("value"));
            this._localmethodforfilters(filters);
        },
        _typesearch : function(oevent){
            var filters = new Filter("Type",FilterOperator.EQ,oevent.getParameter("value"));
            this._localmethodforfilters(filters);
        },


        // SMART TABLE : Related

_localmethodforsmarttable : function(filters1){
            debugger;
            var xFilter = [];		
            xFilter.push(filters1);

			var finalfilter = new Filter({
				filters: xFilter,
				
			});
			var binding = this.getView().byId("innertable").getBinding("items");
			binding.filter(finalfilter);
            // var count = binding.aLastContexts.length;
            // var count1 = {
            //     "cnt" : count
            // };
            // var countjson = new JSONModel();
            // countjson.setData(count1);
            // this.getView().setModel(countjson,"c1");
        },
        onFilterSelect : function(oevent){
           
            var sKey = oevent.getParameter("key");
            if(sKey === "b500"){
                var filters = new Filter("BasePrice",FilterOperator.LE,"500");
                this._localmethodforsmarttable(filters);
                   }
                   else
            if(sKey === "a500"){
                var filters = new Filter("BasePrice",FilterOperator.GE,"500");
                this._localmethodforsmarttable(filters);
            }
            else
            if(sKey === "All"){
                var filters = [];
                var binding = this.getView().byId("innertable").getBinding("items");
                binding.filter(filters);
            }    
            
            


        },
        onSort: function () {
            var oSmartTable = this.getView().byId("smartTable");
            if (oSmartTable) {
                oSmartTable.openPersonalisationDialog("Sort");
            }
        },

        //Smart table add record
        _addrecord : function(){
          
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter.navTo("create",{
                from : "worklist",
                to : "create",
                uuid : 10
            },true);
        },



        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        _onInit : function () {
            var oViewModel;

            // keeps the search state
            this._aTableSearchState = [];

            // Model used to manipulate control states
            oViewModel = new JSONModel({
                worklistTableTitle : this.getResourceBundle().getText("worklistTableTitle"),
                shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
                shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
                tableNoDataText : this.getResourceBundle().getText("tableNoDataText")
            });
            this.setModel(oViewModel, "worklistView");

        },

        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        /**
         * Triggered by the table's 'updateFinished' event: after new table
         * data is available, this handler method updates the table counter.
         * This should only happen if the update was successful, which is
         * why this handler is attached to 'updateFinished' and not to the
         * table's list binding's 'dataReceived' method.
         * @param {sap.ui.base.Event} oEvent the update finished event
         * @public
         */
        onUpdateFinished : function (oEvent) {
            // update the worklist's object counter after the table update
            var sTitle,
                oTable = oEvent.getSource(),
                iTotalItems = oEvent.getParameter("total");
            // only update the counter if the length is final and
            // the table is not empty
            if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
                sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
            } else {
                sTitle = this.getResourceBundle().getText("worklistTableTitle");
            }
            this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
        },

        /**
         * Event handler when a table item gets pressed
         * @param {sap.ui.base.Event} oEvent the table selectionChange event
         * @public
         */
        onPress : function (oEvent) {
            // The source is the list item that got pressed
           // this._showObject(oEvent.getSource());
            var uuid1 = oEvent.getSource().getBindingContext("wip").getProperty("SAP_UUID");
      
            this.getRouter().navTo("object", {
                from: "worklist",
                to: "object",
                uuid : uuid1
            });
        },
        onPresssmarttable : function (oEvent) {
            // The source is the list item that got pressed
           // this._showObject(oEvent.getSource());
            var uuid1 = oEvent.getSource().getBindingContext().getProperty("SAP_UUID");
      
            this.getRouter().navTo("create", {
                from: "worklist",
                to: "create",
                uuid : uuid1
            });
        },
        /**
         * Event handler for navigating back.
         * Navigate back in the browser history
         * @public
         */
        onNavBack : function() {
            // eslint-disable-next-line sap-no-history-manipulation
            history.go(-1);
        },


        onSearch : function (oEvent) {
            if (oEvent.getParameters().refreshButtonPressed) {
                // Search field's 'refresh' button has been pressed.
                // This is visible if you select any main list item.
                // In this case no new search is triggered, we only
                // refresh the list binding.
                this.onRefresh();
            } else {
                var aTableSearchState = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery && sQuery.length > 0) {
                    aTableSearchState = [new Filter("TimeEntryID", FilterOperator.Contains, sQuery)];
                }
                this._applySearch(aTableSearchState);
            }

        },

        /**
         * Event handler for refresh event. Keeps filter, sort
         * and group settings and refreshes the list binding.
         * @public
         */
        onRefresh : function () {
            var oTable = this.byId("table");
            oTable.getBinding("items").refresh();
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Shows the selected item on the object page
         * @param {sap.m.ObjectListItem} oItem selected Item
         * @private
         */
        _showObject : function (oItem) {
            var x = oItem.getBindingContext("wip").getPath().substring("/YY1_WIPENTRIES");
            this.getRouter().navTo("object", {
                objectId: x.length
            });
        },

        /**
         * Internal helper method to apply both filter and search state together on the list binding
         * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
         * @private
         */
        _applySearch: function(aTableSearchState) {
            var oTable = this.byId("table"),
                oViewModel = this.getModel("worklistView");
            oTable.getBinding("items").filter(aTableSearchState, "Application");
            // changes the noDataText of the list in case there are no filter results
            if (aTableSearchState.length !== 0) {
                oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
            }
        }

    });
});
