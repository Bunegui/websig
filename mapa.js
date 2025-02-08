// Inicializar o mapa
var map = L.map(document.getElementById('mapaDIV'), {
    center: [38.736946, -9.142685],
    zoom: 15
});

// BASEMAP
let basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
basemap.addTo(map);

// Adicionar uma escala ao mapa
L.control.scale({ imperial: false, metric: true }).addTo(map);

// Camada GeoJSON para os Bombeiros
var bombeirosLayer = L.geoJSON(null, {
    style: function(feature) {
        return {
            color: "#FF5733", // Cor das bordas (laranja para Bombeiros)
            weight: 2,
            fillColor: "#FFC300", // Cor de preenchimento
            fillOpacity: 0.7
        };
    },
    onEachFeature: function(feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup("<b>" + feature.properties.name + "</b>"); // Popup com a propriedade "name"
        }
    }
});

// Carregar GeoJSON dos Bombeiros
fetch('geojson/Bombeiros.geojson')
    .then(response => response.json())
    .then(data => {
        bombeirosLayer.addData(data);
    });

// Camada GeoJSON para Linhas de Água
var linhasAguaLayer = L.geoJSON(null, {
    style: function(feature) {
        return {
            color: "blue", // Cor azul para as linhas de água
            weight: 2,
            opacity: 1
        };
    },
    onEachFeature: function(feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup("<b>" + feature.properties.name + "</b>"); // Popup com a propriedade "name"
        }
    }
});

// Carregar GeoJSON das Linhas de Água
fetch('geojson/linhas_agua.geojson')
    .then(response => response.json())
    .then(data => {
        linhasAguaLayer.addData(data);
    });

// Camada GeoJSON para Linhas de Água Buffer
var linhasAguaBufferLayer = L.geoJSON(null, {
    style: function(feature) {
        return {
            color: "blue", // Cor azul para as linhas de água
            weight: 2,
            opacity: 0.5, // Mais transparência
            dashArray: "5, 5" // Linhas tracejadas
        };
    },
    onEachFeature: function(feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup("<b>" + feature.properties.name + "</b>"); // Popup com a propriedade "name"
        }
    }
});

// Carregar GeoJSON do Buffer das Linhas de Água
fetch('geojson/linhas_agua_Buffer.geojson')
    .then(response => response.json())
    .then(data => {
        linhasAguaBufferLayer.addData(data);
    });

// Camada GeoJSON para o Risco
var riscoLayer = L.geoJSON(null, {
    style: function(feature) {
        return {
            color: "red", // Cor para a camada de risco
            weight: 2,
            opacity: 0.7
        };
    },
    onEachFeature: function(feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup("<b>" + feature.properties.name + "</b>"); // Popup com a propriedade "name"
        }
    }
});

// Carregar GeoJSON do Risco
fetch('geojson/Risco.json')
    .then(response => response.json())
    .then(data => {
        riscoLayer.addData(data);
    });

// Criar um controle de camadas
var overlayMaps = {
    "Bombeiros": bombeirosLayer,
    "Linhas de Água": linhasAguaLayer,
    "Linhas de Água (Buffer)": linhasAguaBufferLayer,
    "Risco": riscoLayer // Adicionando a camada de Risco ao controle
};

// Adicionar o controle de camadas ao mapa
L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);
