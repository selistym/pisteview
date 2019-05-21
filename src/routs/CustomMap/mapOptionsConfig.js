import mapStyles from "./mapStyles";

const mapOptionsConfig = (maps) => {

  return {
    streetViewControl: false,
    scaleControl: true,
    fullscreenControl: false,
    styles: mapStyles,
    gestureHandling: "greedy",
    disableDoubleClickZoom: true,
    minZoom: 11,
    maxZoom: 18,

    mapTypeControl: true,
    mapTypeId: maps.MapTypeId.TERRAIN,
    mapTypeControlOptions: {
      style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: maps.ControlPosition.BOTTOM_CENTER,
      mapTypeIds: [
        maps.MapTypeId.ROADMAP,
        maps.MapTypeId.SATELLITE,
        maps.MapTypeId.TERRAIN,
      ]
    },

    zoomControl: true,
    clickableIcons: false
  }
};

export default mapOptionsConfig;