(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "lastUpdate",
            alias: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "positif",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "dirawat",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "sembuh",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "meninggal",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "tanggal",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "positif_kumulatif",
			alias: "positif kumulatif",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "dirawat_kumulatif",
			alias: "dirawat kumulatif",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "sembuh_kumulatif",
			alias: "sembuh kumulatif",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "meninggal_kumulatif",
			alias: "meninggal kumulatif",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: "Harian",
			alias: "Covid Indonesia Daily Status Summary",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian", function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "lastUpdate": feat[i].lastUpdate,
                    "positif": feat[i].positif,
                    "dirawat": feat[i].dirawat,
                    "sembuh": feat[i].sembuh,
                    "meninggal": feat[i].meninggal,
                    "tanggal": feat[i].tanggal,                    
					"positif_kumulatif": feat[i].positif_kumulatif,
                    "dirawat_kumulatif": feat[i].dirawat_kumulatif,
                    "sembuh_kumulatif": feat[i].sembuh_kumulatif,
                    "meninggal_kumulatif": feat[i].meninggal_kumulatif,
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Covid Harian"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
