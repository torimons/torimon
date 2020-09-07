<template>
    <div id='map'>
        <OSMToggleButton id="osm"
            @osmOn="osmOn"
            @osmOff="osmOff"
        />
        <ZoomInOutButton id="zoom-btn-container"
            @zoomIn="zoomIn"
            @zoomOut="zoomOut"
        />
    </div>
</template>

<script lang='ts' src='./index.ts'/>


<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
html,
body,
#map {
    height: 100%;
}
#osm {
    bottom: 120px;
    z-index: 1000;
}
#zoom-btn-container{
    bottom: 20px;
    right: 0px;
}
body {
    margin: 0;
    height: 100%;
}
</style>
