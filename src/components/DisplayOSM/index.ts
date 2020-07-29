import { Component, Vue, Watch} from 'vue-property-decorator';

@Component
export default class MapView extends Vue {
    private tileLayer!: L.TileLayer;
    private displayOsm: boolean = true;
    /**
     * diplayOSMの変更を検知してleafletのmapからtileLayerのON/OFFを行う
     */
    @Watch('displayOsm')
    private onDisplayOSMChange() {
        if (this.displayOsm) {
            this.$emit('OsmOn');
            // this.tileLayer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        } else {
            this.$emit('OsmOff');
            // this.tileLayer.setUrl('');
        }
    }
}
