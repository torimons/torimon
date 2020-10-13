import { Component, Vue } from 'vue-property-decorator';
import Map from '@/Map/Map.ts';
import CreationMapView from '@/components/CreationMapView/index.vue';
import EditorToolBar from '@/components/EditorToolBar/index.vue';
import { SpotType } from '@/store/types';

@Component({
    components: {
        CreationMapView,
        EditorToolBar,
    },
})
export default class MainCreationView extends Vue {
}
