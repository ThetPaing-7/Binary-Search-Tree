import Node from "./node.js"

/*
camel case
*/

class Tree{
    
    
    #buildTree(array, start = 0, end = array.length - 1){
        // let uniqueArray = [...new Set(array)].sort((a,b) => a - b)

        // base case
        if(start > end) return null

        let mid = Math.floor((start + end ) / 2)

        let node = new Node(array[mid])

        node.left = this.#buildTree(array,start, mid - 1)
        node.right = this.#buildTree(array,mid + 1, end)

        return node
        
    }
    
    constructor(array){
        this.root = this.#buildTree([...new Set(array)].sort((a,b) => a - b)

        )
    }


    prettyPrint(node,prefix = '', isLeft = true){
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }


    showTree(){
        return this.root
    }
}



const neem = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
const rootNode = neem.showTree()
neem.prettyPrint(rootNode)
