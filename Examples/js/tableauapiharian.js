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
        $.getJSON("https://data.covid19.go.id/public/api/update.json", function(resp) {
            var feat = resp.update.harian,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "lastUpdate": feat[i].key,
                    "positif": feat[i].jumlah_positif,
                    "dirawat": feat[i].jumlah_dirawat,
                    "sembuh": feat[i].jumlah_sembuh,
                    "meninggal": feat[i].jumlah_meninggal,
                    "tanggal": feat[i].key_as_string,                    
					"positif_kumulatif": feat[i].value.jumlah_positif_kum,
                    "dirawat_kumulatif": feat[i].value.jumlah_dirawat_kum,
                    "sembuh_kumulatif": feat[i].value.jumlah_sembuh_kum,
                    "meninggal_kumulatif": feat[i].value.jumlah_meninggal_kum,
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
