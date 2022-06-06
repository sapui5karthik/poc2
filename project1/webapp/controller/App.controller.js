sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("com.wip2.project1.controller.App", {

        onInit : function () {
       
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        }
    });

});
