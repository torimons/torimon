import { Component, Vue, Watch} from 'vue-property-decorator';

@Component
export default class OSMToggleButton extends Vue {
    private tileLayer!: L.TileLayer;
    private displayOSM: boolean = true;
    /**
     * diplayOsmの変更を検知してOSMのON/OFFの切り替えを行う
     */
    @Watch('displayOSM')
    private onDisplayOsmChange() {
        if (this.displayOSM) {
            this.$emit('osmOn');
        } else {
            this.$emit('osmOff');
        }
    }
}
