sap.ui.define(["sap/ui/core/format/DateFormat"], function (DateFormat) {
    "use strict";

    return {

        /**
         * Rounds the number unit value to 2 digits
         * @public
         * @param {string} sValue the number string to be rounded
         * @returns {string} sValue with 2 digits rounded
         */
        numberUnit : function (sValue) {
            if (!sValue) {
                return "";
            }
            return parseFloat(sValue).toFixed(2);
        },
        dateDisplay: function(d3) {

			if (!d3 || d3 === undefined) {
				return "";
			}
			var oDateFormat = DateFormat.getDateInstance({
				scale: "medium",
				pattern: "MM/dd/yyyy"

			});
			var finaldate = oDateFormat.format(new Date(d3));

			return finaldate;

		},
        dateTimebackendwithtime: function(date) {
			//2021-03-02:T00:00:00
			if (date !== undefined) {

				var oDateFormat = DateFormat.getDateInstance({
					scale: "medium",

					pattern: "yyyy-MM-dd"
				});
				var subFromDate = oDateFormat.format(new Date(date));

				return subFromDate + "T00:00:00";
			} else {
				return "";
			}

		},

    };

});