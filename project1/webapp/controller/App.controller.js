sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("com.wip2.project1.controller.App", {

        onInit : function () {
            // am-2
            // apply content density mode to root view
            // Adding comments
            // suman
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        }
    });

});
