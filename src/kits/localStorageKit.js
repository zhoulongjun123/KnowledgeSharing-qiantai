const key = "buyGoodsCount";
export function setItem(goodsinfo) {
    var goodsObj = getItem();
    if (goodsObj[goodsinfo.gid]) {
        goodsObj[goodsinfo.gid] = goodsObj[goodsinfo.gid] + goodsinfo.bcount;
    } else {
        goodsObj[goodsinfo.gid] = goodsinfo.bcount;
    }
    localStorage.setItem(key, JSON.stringify(goodsObj));
}


// export function setItem(goodsinfo) {
//     var goodsObj = getItem();
//     if (goodsObj[goodsinfo.gid]) {
//         goodsObj[goodsinfo.gid] = goodsObj[goodsinfo.gid] + goodsinfo.bcount;
//     } else {
//         goodsObj[goodsinfo.gid] = goodsinfo.bcount;
//     }
//     localStorage.setItem(key, JSON.stringify(goodsObj));
// }
export function getItem() {
    var gStr = localStorage.getItem(key);
    var obj = JSON.parse(gStr);
    if (!obj) {
        localStorage.setItem(key, JSON.stringify({}));
        return;
    }
    return obj;
}
export function removeItem(goodsid) {
    var goodsObj = getItem();
    delete goodsObj[goodsid];
    localStorage.setItem(key, JSON.stringify(goodsObj));
}
export function updageItem(obj) {
    /*
         obj:{gid: ,count:}
    */

    // 1.0 获取到所有的商品
    var goodsObj = getItem();

    // 2.0 修改gid对应的count
    goodsObj[obj.gid] = obj.count;

    // 3.0 重新写回
    localStorage.setItem(key, JSON.stringify(goodsObj));
}