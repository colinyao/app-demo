const routes = [{
    label: '推荐',
    name: 'recommend'
}, {
    label: '附近',
    name: 'nearby'
}, {
    label: '榜单',
    name: 'rank'
}, {
    label: '明星',
    name: 'star'
}, {
    label: '搞笑',
    name: 'funny'
}, {
    label: '情感',
    name: 'emotion'
}, {
    label: '社会',
    name: 'social'
}, {
    label: '电影',
    name: 'movie'
}, {
    label: '汽车',
    name: 'car'
}, {
    label: '游戏',
    name: 'game'
}, {
    label: '美女',
    name: 'beauty'
}, {
    label: '音乐',
    name: 'music'
}, {
    label: '美食',
    name: 'food'
}, {
    label: '校园',
    name: 'school'
}, {
    label: '军事',
    name: 'military'
}, {
    label: '运动健身',
    name: 'sport'
}, {
    label: '旅游',
    name: 'trval'
}, {
    label: '瘦身',
    name: 'reduceWeight'
}, {
    label: '时尚',
    name: 'fasion'
}, {
    label: '读书',
    name: 'reading'
}, {
    label: '财经',
    name: 'money'
}]

function hashSort(array) {
    let obj = {}
    for (let item of array) {
        obj[item.name] = item.label
    }
    return obj
}
export let routesHash = hashSort(routes)

export default routes
