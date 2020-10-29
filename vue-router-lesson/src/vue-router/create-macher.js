
import createRouteMap from './create-route-map'
import { createRoute } from './history/base'

export default function createMacher(routes){
    // 将数据进行格式化
    //pathList [/ /about /about/a]
    // pathMap {'/': app, "/a": a}
    let { pathList, pathMap } = createRouteMap(routes)
    // createRouteMap 此函数有重载的作用，可返回pathList，和pathMap，也可已在此基础上添加路由
    function addRoutes(routes){
        // 在原有的pathList， 和pathMap的基础上添加路由
        createRouteMap(routes,  pathList, pathMap)
    }

    function match(location){  // 匹配对应的组件
        let record =  pathMap[location]
        return createRoute(record, {
            path : location
        })
    }


    return {
        addRoutes,
        match 
    }
}