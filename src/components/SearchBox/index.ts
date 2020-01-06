import { Component, Watch, Vue, Emit } from 'vue-property-decorator';
import { mdiAccount } from '@mdi/js';

@Component
export default class SearchBox extends Vue {
    public searchWord: string = '';
    private onFocus: boolean = false;

    private focus(): void {
        this.onFocus = true;
    }

    private cancel(): void {
        this.onFocus = false;
    }

    @Watch('searchWord')
    private sendSearchWord(): void {
        this.$emit('searchWordInput', this.searchWord);
    }
}
