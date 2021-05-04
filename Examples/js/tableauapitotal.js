(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [ {
            id: "total_positif",
			alias: "Total positif",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "total_dirawat",
			alias: "Total dirawat",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "total_sembuh",
			alias: "Total sembuh",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "total_meninggal",
			alias: "Total meninggal",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "penambahan_positif",
			alias: "Penambahan positif",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "penambahan_dirawat",
			alias: "Penambahan dirawat",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "penambahan_sembuh",
			alias: "Penambahan sembuh",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "penambahan_meninggal",
			alias: "Penambahan meninggal",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "tanggal",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "Total",
			alias: "Covid Indonesia Total Status Summary",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://apicovid19indonesia-v2.vercel.app/api/indonesia/more", function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
                tableData.push({
                    "total_positif": feat.total.positif,
                    "total_dirawat": feat.total.dirawat,
                    "total_sembuh": feat.total.sembuh,
                    "total_meninggal":feat.total.meninggal,
                    "penambahan_positif": feat.penambahan.positif,
                    "penambahan_dirawat": feat.penambahan.dirawat,
                    "penambahan_sembuh": feat.penambahan.sembuh,
                    "penambahan_meninggal":feat.penambahan.meninggal,
                    "tanggal":feat.penambahan.tanggal,
                });
            

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Covid Kumulatif"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
