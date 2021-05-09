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
            id: "laki-laki",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "perempuan",
            dataType: tableau.dataTypeEnum.int
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
            var feat = resp.list_data,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "provinsi": list_data.feat[i].key,
					"kasus": list_data.feat[i].jumlah_kasus,
					"dirawat": list_data.feat[i].jumlah_dirawat,
					"sembuh": list_data.feat[i].jumlah_sembuh,
					"meninggal": list_data.feat[i].jumlah_meninggal,
					"last_date": last_date,
					"laki-laki": list_data.feat[i].jenis_kelamin[0].doc_count,
					"perempuan": list_data.feat[i].jenis_kelamin[0].doc_count,
					"0-5": list_data.feat[i].kelompok_umur[0].doc_count,
					"6-18": list_data.feat[i].kelompok_umur[1].doc_count,
					"19-30": list_data.feat[i].kelompok_umur[2].doc_count,
					"31-45": list_data.feat[i].kelompok_umur[3].doc_count,
					"46-59": feat[i].kelompok_umur[4].doc_count,
					"≥60": list_data.feat[i].kelompok_umur[5].doc_count,
					"penambahan_positif": list_data.feat[i].penambahan.positif,
					"penambahan_sembuh": list_data.feat[i].penambahan.sembuh,
					"penambahan_meninggal": list_data.feat[i].penambahan.meninggal,
					"lon": list_data.feat[i].lokasi.lon,
					"lat": list_data.feat[i].lokasi.lat
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
