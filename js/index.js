function Node(data,left,right) {
    this.data = data
    this.left= left
    this.right=right
    this.show = show
}

function show() {
    return this.data
}

function BST() {
    this.root= null
    this.insert = insert
    this.add = add
    this.inOrder=inOrder
}
function add(node, data) {  //  返回插入新节点后二分搜索树的根
    // if (node.data === data) {
    //     return
    // } else if (node.data > data && node.left === null) {
    //     node.left = new Node(data, null, null);
    //     return
    // } else if (node.data < data && node.right === null) {
    //     node.right = new Node(data, null, null);
    //     return
    // }
    if (node===null) {
        return new Node(data,null,null)
    }
    if (node.data > data) {
        node.left = add(node.left, data)
    } else {
       node.right =  add(node.right, data)
    }
    return node
}

function insert(data) {
    // var _this=this
    // if (this.root ===null) {
    //     this.root = new Node(data, null, null);
    // } else {
    this.root = this.add(this.root,data)
        // var current = this.root
        // var parent
        // while (true) {
        //     parent = current
        //     if (data < current.data) {
        //         current = current.left;
        //         if (current===null) {
        //             parent.left=n;
        //             break;
        //         }
        //     } else{
        //         current = current.right
        //         if (current == null) {
        //             parent.right=n;
        //             break
        //         }
        //     }
        // }
    // }
}
function inOrder(node) {
    if (node==null) {
        return
    }
    inOrder(node.left)
    console.log(node.show())
    inOrder(node.riight)
} 
// function getMin(root) {
//    var current = root;
//    while (!(current.left===null)) {
//        current = current.left
//    } 
//    return current.data
// }
function getMin(node) {
    if (node.left === null) {
        return node
    } else {
        return getMin(node.left)
    }
}
function getMax(root) {
    var current = root;
    while (!(current.right === null)) {
        current = current.right
    }
    return current.data
}

function find(data) {
    var current = bstTree.root
    while (current!= null) {
        if (current.data == data) {
            return current
        } else if (data <current.data) {
            current = current.left
        } else {
            current = current.right
        }
    }
    return null
}
 
var bstTree = new BST()
bstTree.insert(32)
bstTree.insert(8)
bstTree.insert(88)
bstTree.insert(2)
bstTree.insert(12)
// console.log(bstTree,'bstTreebstTree')
// inOrder(bstTree.root)
const minNum = getMin(bstTree.root)
console.log(minNum)
const max = getMax(bstTree.root)
console.log(max)
const fined = find(88)
console.log(fined)
