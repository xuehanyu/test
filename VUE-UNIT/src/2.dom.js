import { nodeInternals } from "stack-utils"

// 写一个dom库
 export const removeNode = (node)=>{
     node.parentNode.remove(node)
 }