import Map from '@/Map/Map.ts';
import Spot from '@/Spot/Spot.ts';

describe('Mapクラスの親スポット登録のテスト', () => {
    let map: Map;
    const testBounds = {
        topL: {lat: 0, lng: 0},
        botR: {lat: 0, lng: 0},
    };
    const testCoord = { lat: 0, lng: 0 };

    it('指定した親スポットがparentSpotに登録される', () => {
        map = new Map(0, 'testMap', testBounds, undefined);
        const testSpot = new Spot(0, 'testSpot', testCoord);
        // 登録
        map.setParentSpot(testSpot);
        expect((map as any).parentSpot).toStrictEqual(testSpot);
    });

    it('parentSpot登録時に、parentSpotのdetailMapとして自身を登録する', () => {
        map = new Map(0, 'testMap', testBounds);
        const testSpot = new Spot(0, 'testSpot', testCoord);
        map.setParentSpot(testSpot);
        expect((testSpot as any).detailMaps.includes(map)).toBe(true);
    });

    it('親spotが登録済みかどうかをhasParentSpotにより判定する', () => {
        const testMap: Map = new Map(0, 'testMap', testBounds);
        const testSpot: Spot = new Spot(0, 'testSpot', testCoord);
        // 登録前の判定
        expect(testMap.hasParentSpot(testSpot)).toBe(false);
        // 登録後の判定
        (testMap as any).parentSpot = testSpot;
        expect(testMap.hasParentSpot(testSpot)).toBe(true);
    });
});
