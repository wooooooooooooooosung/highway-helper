const query = require('./db/mysql')

console.log(query("SELECT * FROM meal"))

/*
axios.get(API_CODE_URL).then((res) =>{
    const data = res.data.list;

    var routeList = []
    var gudClssList = []

    for(idx in data) {
        routeList.push({ routeCd: data[idx].routeCd, routeNm: data[idx].routeNm })
        gudClssList.push({ gudClssCd: data[idx].gudClssCd, gudClssNm: data[idx].gudClssNm })
    }

    console.log(getDistinctList(routeList))
    console.log(getDistinctList(gudClssList))
})


function getDistinctList(list) {
    const map = new Map()
    for(const character of list){
        map.set(JSON.stringify(character), character)
    }
    return [...map.values()]
}
*/
