import { Component, Vue, Watch } from 'vue-property-decorator';
import Map from '@/Map/Map.ts';
import { mapViewGetters } from '@/store';
import SearchBox from '@/components/SearchBox/index.vue';
import Search from '@/utils/Search';
import MapList from '@/components/MapList/index.vue';
import MapDataConverter from '@/utils/MapDataConverter';
import API from '@/utils/API';

@Component({
    components: {
        SearchBox,
        MapList,
    },
})
export default class MapSearch extends Vue {
    private searchWord: string = '';
    private getDataSucceeded: boolean = false;
    private targetMaps: Map[] = [];
    private mapSearchResults: Map[] = [];
    private search!: Search<Map>;
    private backgroundColor: 'transparent' | 'white' = 'transparent';
    private api: API = new API();
    private loading: boolean = true;

    public async mounted() {
        (await this.api.getAllMaps())
            .map((map) => {
                this.targetMaps = this.targetMaps.concat(map);
                this.getDataSucceeded = true;
            });
        this.search = new Search<Map>(this.targetMaps);
        this.loading = false;
        // 最初は全結果を表示
        this.mapSearchResults = this.targetMaps;
    }

    /**
     * 検索文字列をセットする．SearchBoxからemitで呼ばれる？
     * @param searchWord 検索文字列
     */
    public setSearchWord(searchWord: string) {
        this.searchWord = searchWord;
    }

    /**
     * searchWordの変更を検知して検索を行う
     */
    @Watch('searchWord')
    public searchMap(): void {
        // 検索を✕ボタンでclearした場合は全データ表示
        if (this.searchWord === null) {
            this.mapSearchResults = this.targetMaps;
            return;
        }
        // 検索ワードが空の場合は全データ表示
        if (this.searchWord.length === 0) {
            this.mapSearchResults = this.targetMaps;
        } else {
            this.mapSearchResults = this.search.search(this.searchWord);
        }
    }
}
