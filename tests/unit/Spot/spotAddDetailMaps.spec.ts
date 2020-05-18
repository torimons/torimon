import Spot from '@/Spot/Spot.ts';
import Map from '@/Map/Map.ts';

describe('Spotクラスの詳細マップ登録のテスト', () => {
    let spot: Spot;
    const testBounds = {
        topL: {lat: 0, lng: 0},
        botR: {lat: 0, lng: 0},
    };
    const testCoord = { lat: 0, lng: 0 };

    it('指定した詳細マップがdetailMapsに追加される', () => {
        spot = new Spot(0, 'testSpot', testCoord, undefined, undefined, undefined, undefined);
        const testDetailMaps = [];
        for (let i = 0; i < 5; i++) {
            testDetailMaps.push(new Map(i, 'testMap', testBounds, undefined));
        }
        // 登録
        spot.addDetailMaps(testDetailMaps);
        expect((spot as any).detailMaps).toStrictEqual(testDetailMaps);
    });

    it('登録済みmapは重複して登録しない', () => {
        const testSpot: Spot = new Spot(0, 'testSpot', testCoord, undefined, undefined, undefined, undefined);
        const testDetailMaps = [];
        for (let i = 0; i < 5; i++) {
            testDetailMaps.push(new Map(i, 'testMap', testBounds, undefined));
        }
        const mapDuplicated: Map = new Map(0, 'testMap', testBounds, undefined);
        testDetailMaps.push(mapDuplicated);
        testSpot.addDetailMaps(testDetailMaps);
        expect((testSpot as any).detailMaps).toStrictEqual(testDetailMaps);
    });

    it('spotにdetialMapを登録する際に,detailMapのparentSpotとして自身をセットする', () => {
        const testSpot: Spot = new Spot(0, 'testSpot', testCoord, undefined, undefined, undefined, undefined);
        const testMap: Map = new Map(0, 'testMap', testBounds, undefined);
        testSpot.addDetailMaps([testMap]);
        expect((testMap as any).parentSpot).toStrictEqual(testSpot);
    });

    it('detailMapが登録済みかどうかをhasDetailMapにより判定する', () => {
        const testSpot: Spot = new Spot(0, 'testSpot', testCoord, undefined, undefined, undefined, undefined);
        const testMap: Map = new Map(0, 'testMap', testBounds, undefined);
        // 登録前の判定
        expect(testSpot.hasDetailMap(testMap)).toBe(false);
        // 登録後の判定
        (testSpot as any).detailMaps.push(testMap);
        expect(testSpot.hasDetailMap(testMap)).toBe(true);
    });
});
