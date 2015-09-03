/**
 * @jsx React.DOM
 */

var MapTools = React.createClass({
  stopDefault: function(evt){
    evt.preventDefault()
    console.log("yaya")
  },
  handleZoomInClick: function(event) {
    this.props.map.zoomIn(1);
  },
  handleZoomOutClick: function(event) {
    this.props.map.zoomOut(1);
  },
  rollUpToTitle: function(evt){
    evt.preventDefault()
    var target = $('#stuff')
    $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
  },
  toggleToHeatmap: function(){
    this.props.toggleVisualisation("heatmap")
  },
  toggleToMarker: function(){
    this.props.toggleVisualisation("marker")
  },
  render: function(){
    var heatmapButtonStyling = {backgroundColor: this.props.visualisation=== "heatmap" ? this.props.theme.secondary : this.props.theme.primary}
    var markerButtonStyling = {backgroundColor: this.props.visualisation=== "marker" ? this.props.theme.secondary : this.props.theme.primary}
    return(
        <div className="toolbox click-thru" style={this.props.mapStyling}>
          <div className="toolbox" onClick={this.rollUpToTitle} id="return-up" style={{top: 0, right: 10, position: "absolute", fontSize: "54px", color: this.props.theme.primary, cursor: 'pointer'}}>
            <span className="fa fa-chevron-circle-up clickable" ></span>
          </div>
          <div className="toolbox" id="zoom-buttons" style={{bottom: 15, right: 5, position: "absolute", fontSize: "54px", color: this.props.theme.primary}}>
            <span onClick={this.handleZoomInClick} className="fa fa-plus-circle button-buddy clickable" id=""  ></span>
            <span onClick={this.handleZoomOutClick}  className="fa fa-minus-circle button-buddy clickable" id=""  ></span>
          </div>
          <div className="toolbox" style={{top: 0, left: 10, position: "absolute", fontSize: "54px", color: this.props.theme.primary, zIndex: 3, fontFamily: "indie-font", textShadow: "0px 2px 4px #222"}}>
            <span>Graffi.so</span>
          </div>
          <div className="toolbox" style={{bottom: 26, right: 120, position: "absolute", fontSize: "54px", color: this.props.theme.primary}}>
            <span>
              <span onClick={this.toggleToMarker} className={"toggle-buddy left-end clickable " + (this.props.visualisation=== "marker" ? "shadow-left" : "")} style={markerButtonStyling}> Markers
              </span>
              <span onClick={this.toggleToHeatmap} className={"toggle-buddy right-end clickable " + (this.props.visualisation=== "heatmap" ? "shadow-right" : "")} style={heatmapButtonStyling}> Heatmap
              </span>
            </span>
          </div>
        </div>
      )
  }
})