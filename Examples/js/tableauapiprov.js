(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [ {
            id: "provinsi",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "kasus",
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
            id: "last_date",
			alias: "tanggal",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "0-5",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "6-18",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "19-30",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "31-45",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "46-59",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "≥60",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "penambahan_positif",
			alias: "penambahan positif",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "penambahan_sembuh",
			alias: "penambahan sembuh",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "penambahan_meninggal",
			alias: "penambahan meninggal",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "lon",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "lat",
            dataType: tableau.dataTypeEnum.float
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
        $.getJSON("https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more", function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "provinsi": feat[i].provinsi,
					"kasus": feat[i].kasus,
					"dirawat": feat[i].dirawat,
					"sembuh": feat[i].sembuh,
					"meninggal": feat[i].meninggal,
					"last_date": feat[i].last_date,
					"0-5": feat[i].kelompok_umur[0]["0-5"],
					"6-18": feat[i].kelompok_umur[1]["6-18"],
					"19-30": feat[i].kelompok_umur[2]["19-30"],
					"31-45": feat[i].kelompok_umur[3]["31-45"],
					"46-59": feat[i].kelompok_umur[4]["46-59"],
					"≥60": feat[i].kelompok_umur[5]["≥ 60"],
					"penambahan_positif": feat[i].penambahan.positif,
					"penambahan_sembuh": feat[i].penambahan.sembuh,
					"penambahan_meninggal": feat[i].penambahan.meninggal,
					"lon": feat[i].lokasi.lon,
					"lat": feat[i].lokasi.lat
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
            tableau.connectionName = "Covid Provinsi"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
