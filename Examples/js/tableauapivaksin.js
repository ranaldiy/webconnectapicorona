(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "totalsasaran",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "sasaranvaksinsdmk",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "sasaranvaksinlansia",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "sasaranvaksinpetugaspublik",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "vaksinasi1",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "vaksinasi2",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "lastUpdate",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "Vaksin",
			alias: "Covid Indonesia Vaksin Status Summary",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://vaksincovid19-api.vercel.app/api/vaksin", function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
                tableData.push({
                    "totalsasaran": feat.totalsasaran,
                    "sasaranvaksinsdmk": feat.sasaranvaksinsdmk,
                    "sasaranvaksinlansia": feat.sasaranvaksinlansia,
                    "sasaranvaksinpetugaspublik": feat.sasaranvaksinpetugaspublik,
                    "vaksinasi1": feat.vaksinasi1,
                    "vaksinasi2": feat.vaksinasi2,
					"lastUpdate": feat.lastUpdate,
                });
            

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
