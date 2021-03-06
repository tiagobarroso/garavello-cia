window.onload = () => {
  // Geometries
  var point = new ol.geom.Point(
    ol.proj.transform([3, 50], "EPSG:4326", "EPSG:3857")
  );
  var circle = new ol.geom.Circle(
    ol.proj.transform([2.1833, 41.3833], "EPSG:4326", "EPSG:3857"),
    1000000
  );

  // Features
  var pointFeature = new ol.Feature(point);
  var circleFeature = new ol.Feature(circle);

  // Source and vector layer
  var vectorSource = new ol.source.Vector({
    projection: "EPSG:4326",
    features: [pointFeature, circleFeature],
  });

  var style = new ol.style.Style({
    fill: new ol.style.Fill({
      color: "rgba(255, 100, 50, 0.3)",
    }),
    stroke: new ol.style.Stroke({
      width: 2,
      color: "rgba(255, 100, 50, 0.8)",
    }),
    image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color: "rgba(55, 200, 150, 0.5)",
      }),
      stroke: new ol.style.Stroke({
        width: 1,
        color: "rgba(55, 200, 150, 0.8)",
      }),
      radius: 7,
    }),
  });

  var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: style,
  });

  // Maps
  var map = new ol.Map({
    target: "map", // The DOM element that will contains the map
    renderer: "canvas", // Force the renderer to be used
    layers: [
      // Add a new Tile layer getting tiles from OpenStreetMap source
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      vectorLayer,
    ],
    // Create a view centered on the specified location and zoom level
    view: new ol.View({
      center: ol.proj.transform([2.1833, 41.3833], "EPSG:4326", "EPSG:3857"),
      zoom: 4,
    }),
  });
};
