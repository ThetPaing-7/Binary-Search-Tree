import Node from "./node.js"

/*
camel case
*/

class Tree{
    
    
    #buildTree(array, start = null, end = null){
        // let uniqueArray = [...new Set(array)].sort((a,b) => a - b)

        start = 0
        end = array.length

        // base case
        if(start > end) return null

        let mid = (start + end ) / 2

        let node = new Node(array[mid])

        node.left = this.#buildTree(array,start, mid - 1)
        node.right = this.#buildTree(array,mid + 1, end)

        return node
        
    }
    
    constructor(array){
        this.root = this.#buildTree([...new Set(array)].sort((a,b) => a - b)

)
    }


    showTree(){
        return this.root
    }
}



const neem = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
console.log(neem.showTree())
