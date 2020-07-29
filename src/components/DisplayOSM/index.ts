import { Component, Vue, Watch} from 'vue-property-decorator';

@Component
export default class MapView extends Vue {
    private tileLayer!: L.TileLayer;
    private displayOsm: boolean = true;
    /**
     * diplayOsmの変更を検知してOSMのON/OFFの切り替えを行う
     */
    @Watch('displayOsm')
    private onDisplayOsmChange() {
        if (this.displayOsm) {
            this.$emit('OsmOn');
        } else {
            this.$emit('OsmOff');
        }
    }
}
