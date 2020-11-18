import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { store, mapViewGetters, mapViewMutations } from '@/store';
import Map from '@/Map/Map.ts';

@Component
export default class UploadDialog extends Vue {
    @Prop()
    private map!: Map;

    private mapName: string | undefined;
    private mapDescription: string | undefined;
    private isValidInput: boolean = false;
    private loading: boolean = false;
    private mapNameRules = [
        (v: string) => !!v || '地図の名前が必要です',
        (v: string) => (v && v.length <= 20) || '名前は20文字以内',
    ];
    private mapDescriptionRules = [
        (v: string) => !!v || '地図の説明が必要です',
        (v: string) => (v && v.length <= 100) || '説明は100文字以内',
    ];

    public beforeMount() {
        this.mapName = this.map.getName();
        this.mapDescription = this.map.getDescription();
    }

    /**
     * 編集に戻るボタン押下時にcloseDialogイベントを発火する
     */
    @Emit('closeDialog')
    private sendCloseDialog() {
        // 現状特になし
    }

    /**
     * アップロードボタン押下時にサーバーに地図データをアップロードする
     */
    private upload() {
        // APIとの連携後に実装
        this.loading = true;
        setTimeout(() => this.loading = false, 1500);
    }
}
