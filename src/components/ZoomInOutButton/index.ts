import { Component, Vue} from 'vue-property-decorator';

@Component
export default class ZoomInOutButton extends Vue {
    /**
     * zoom_inボタンを押した時にzoominする
     */
    private zoomIn() {
            this.$emit('zoomIn');
    }

    /**
     * zoom_outボタンを押した時にzoomoutする
     */
    private zoomOut() {
            this.$emit('zoomOut');
    }
}
