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
        this.root = this.#buildTree([...new Set(array)].sort((a,b) => a - b))
    }


    // display values in tree format
    prettyPrint(node,prefix = '', isLeft = true){
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }


    // accepts values and return true if value is in tree, else false
    includes(values,root = this.root){

        if(root == null){
            return false
        }

        let root_value = root.data

        // base case
        if(root_value === values){
            return true
        }

        if(values > root_value){
            return this.includes(values,root.right)
        }else if(values < root_value){
            return this.includes(values, root.left)
        }else{
            return false
        }
    
    }

    // accept a value and insert new node to the tree
    insert(value){
        // if value is in tree do nothing
        if(this.includes(value)){
            return 'Value alread Exist'
        }

        let node = new Node(value)

        let current = this.root
        while(current !== null){
            if(current.data > value){
                if(current.left === null){
                    current.left = node
                    return this.root
                }
                current = current.left
            }else
                {
                if(current.right === null){
                    current.right = node
                    return this.root
                }
                current = current.right
            }
        }
    }


    showTree(){
        return this.root
    }
}



const neem = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
const rootNode = neem.showTree()
neem.prettyPrint(rootNode)
// console.log(neem.showTree())
console.log(neem.insert(45))
console.log(neem.insert(6))
// console.log(neem.showTree())
neem.prettyPrint(rootNode)
