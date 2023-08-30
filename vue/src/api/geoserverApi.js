import {boundaryRequest, request01} from "@/network/request01";

export const getBoundaryDataWithShangeHu = data => { //获取尚湖湿地矢量边界
    return request01({
        method: 'GET',
        url: '/geoserver/changshu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=changshu%3Ashsd&maxFeatures=50&outputFormat=application%2Fjson',
        params: data
    })
}

export const getGeoJsonWithProvince = data => { //获取省边界
    return boundaryRequest({
        method: 'GET',
        url: '/geoserver/division/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=division%3Aprovince&maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:4326',
        params: data
    })
}
export const getGeoJsonWithCity = data => { //获取市边界
    return boundaryRequest({
        method: 'GET',
        url: '/geoserver/division/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=division%3Acity&maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:4326',
        params: data
    })
}
export const getGeoJsonWithCounty = data => { //获取区边界
    return boundaryRequest({
        method: 'GET',
        url: '/geoserver/division/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=division%3Acounty&maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:4326',
        params: data
    })
}

export const getDivisionInfo = data => { //通过条件获取江苏省数据
    return boundaryRequest({
        method: 'GET',
        url: '/geoserver/division/ows',
        params: data
    })
}