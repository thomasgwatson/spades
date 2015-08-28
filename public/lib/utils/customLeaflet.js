var customLeaflet = {}

customLeaflet.ThumbnailIcon = L.Icon.extend({
options: {
          iconSize:     [60, 60],
          iconAnchor:   [5, 15]
        }
})

customLeaflet.ThumbnailIconExtended = L.Icon.extend({
options: {
          iconSize:     [220, 220],
          iconAnchor:   [110, 0]
        }
})

// On Click event handler function for markers
customLeaflet.presentMarker = function(e){
  if (e.target.options.zIndexOffset === 0 || e.target.options.zIndexOffset === 1000000)
  {
    var extendedIcon = new customLeaflet.ThumbnailIconExtended({iconUrl: e.target.options.thumb})
    e.target.setIcon(extendedIcon)
    e.target.setZIndexOffset(9000000 + customLeaflet.zIndexOffsetIncrement())
    e.target.closePopup() // This is confusing. closePopup() is opening the popup
  } else {
    var regularIcon = new customLeaflet.ThumbnailIcon({iconUrl: e.target.options.thumb})
    e.target.setIcon(regularIcon)
    e.target.setZIndexOffset(0)
    e.target.openPopup() // This is confusing. openPopup() is closing the popup
  }
}


// Ensure the last clicked image pops up highest

customLeaflet.currentOffset = 0

customLeaflet.zIndexOffsetIncrement = function(){
  customLeaflet.currentOffset ++;
  return customLeaflet.currentOffset
}