import L, {Marker, LatLngExpression} from 'leaflet';

export default class DefaultSpotMarker extends L.Marker {
    private icon: L.Icon = L.icon({
        iconUrl: 'https://github.com/torimons/torimon/blob/master/public/leaflet/icons/marker-icon-2x.png?raw=true',
        iconSize: [50, 82],
        iconAnchor: [25, 80],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94],
    });

    constructor(latlng: LatLngExpression) {
        super(latlng);
        this.setIcon(this.icon);
    }

    public addTo(map: L.Map | L.LayerGroup<any>): this {
        return super.addTo(map).on('click', this.updateFocusedMarker);
    }

    // マーカーが押された際に呼び出される関数
    private updateFocusedMarker(): void {
        /*
            （vuexの状態更新も行う必要がある）
            押したマーカーのスポットの情報の取得
            ポップアップの表示
            */
    }
}