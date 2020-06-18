import MapDataConverter from '@/utils/MapDataConverter';
import { sampleMaps } from '@/store/modules/sampleMaps';
import { initMap } from '@/store/modules/MapViewModule/MapViewState';
import Map from '@/Map/Map.ts';
import { before } from 'lodash';

describe('MapDataConverterのテスト', () => {
    it('recCreateMapでJsonのプロパティとMapインスタンスのプロパティが一致する', () => {
        const testBounds = {
            topL: {lat: 123, lng: 10},
            botR: {lat: 132, lng: 5},
        };
        // 変換するjsonオブジェクト
        const testJson = {
            id: 0,
            name: 'testMap',
            bounds: testBounds,
            floorName: '1F',
        };
        // 変換
        const actualInstance = (MapDataConverter as any).recCreateMap(testJson);
        const actualProperties = {
            id: (actualInstance as any).id,
            name: (actualInstance as any).name,
            bounds: (actualInstance as any).bounds,
            floorName: (actualInstance as any).floorName,
        };
        expect(actualProperties).toStrictEqual(testJson);
    });

    it('recCreateSpotでJsonのプロパティとSpotインスタンスのプロパティが一致する', () => {
        const testCoord = { lat: 123, lng: 10 };
        // 変換するjsonオブジェクト
        const testJson = {
            id: 0,
            name: 'testSpot',
            coordinate: testCoord,
            shape: {
                type: 'Polygon',
                coordinates: [[
                    [0.0, 0.0],
                    [1.0, 1.0],
                ]],
            },
            floorName: '1F',
            description: 'this is test spot',
            attachment: [],
        };
        // 変換
        const actualInstance = (MapDataConverter as any).recCreateSpot(testJson);
        const actualProperties = {
            id: (actualInstance as any).id,
            name: (actualInstance as any).name,
            coordinate: (actualInstance as any).coordinate,
            shape: (actualInstance as any).shape,
            floorName: (actualInstance as any).floorName,
            description: (actualInstance as any).description,
            attachment: (actualInstance as any).attachment,
        };
        expect(actualProperties).toStrictEqual(testJson);
    });

    it('json2treeがMapのインスタンスを返す', () => {
        // mock
        (MapDataConverter as any).recCreateSpot = jest.fn(
            (json) => new Map(0, 'testMap', {topL: {lat: 0, lng: 0}, botR: {lat: 0, lng: 0}}),
        );
        const testJsonString = '{"test": 0}';
        expect(MapDataConverter.json2tree(testJsonString)).toBeInstanceOf(Map);
    });
});
