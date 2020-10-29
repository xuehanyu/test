export default function createMacher(routes, oldPathList, oldPathMap){
    //  进行数组的扁平化
    let pathList = oldPathList || []
    let pathMap = oldPathMap || Object.create(null)

    routes.forEach(route=>{
        // addRouteRecord 根据用户的路径，实现格式化
        addRouteRecord(route, pathList, pathMap)
    })
    return {
        pathList,
        pathMap
    }

}


function addRouteRecord(route, pathList, pathMap, parent){
    let path = parent ? parent.path + '/'+ route.path : route.path
    let redirect ={
        path,
        component: route.component,
        parent
    }
    if(!pathMap[path]){
        pathMap[path] = redirect
        pathList.push(path)
    }
    
    if(route.children){
        route.children.forEach(route => {
            addRouteRecord(route,  pathList, pathMap, redirect)
        }); 
    }
}