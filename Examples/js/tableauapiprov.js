(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [ {
            id: "provinsi",
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
        $.getJSON("https://data.covid19.go.id/public/api/prov.json", function(resp) {
            var feat = resp.list_data,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "provinsi": feat[i].key,
					"kasus": feat[i].jumlah_kasus,
					"dirawat": feat[i].jumlah_dirawat,
					"sembuh": feat[i].jumlah_sembuh,
					"meninggal": feat[i].jumlah_meninggal,
					"last_date": last_date,
					"laki_laki": feat[i].jenis_kelamin[0].doc_count,
					"perempuan": feat[i].jenis_kelamin[1].doc_count,
					"0_5": feat[i].kelompok_umur[0].doc_count,
					"6_18": feat[i].kelompok_umur[1].doc_count,
					"19_30": feat[i].kelompok_umur[2].doc_count,
					"31_45": feat[i].kelompok_umur[3].doc_count,
					"46_59": feat[i].kelompok_umur[4].doc_count,
					"≥60": feat[i].kelompok_umur[5].doc_count,
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
