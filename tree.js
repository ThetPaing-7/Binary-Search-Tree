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
        this.depthCount = 0
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
        
        this.depthCount++
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

        this.depthCount++
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


    getSuccessor(curr) {
        curr = curr.right;
        while (curr !== null  && curr !== undefined && curr.left !== null)
            curr = curr.left;
        return curr;
    }


    // // accept a values and remove from the tree
    // deleteItem(value){
    //     // if value is not in tree do nothing
    //     if(!this.includes(value)){
    //         return 'Value does not exist'
    //     }

    //     // the node has no child, the leave node
    //     let current = this.root
    //     let previous = null
    //     while(true){
    //     if(value > current.data){
    //         previous = current
    //         current = current.right
    //         if(current.data === value && current.left === null && current.right === null){
    //             previous.right = null
    //             return this.root
    //         }
    //     }else if(value < current.data){
    //         previous = current
    //         current = current.left
    //         if(current.data === value && current.left === null && current.right === null){
    //             previous.left = null
    //             return this.root
    //         }
    //     }
    //     else {
    //        let child
    //         if (current.left !== null) {
    //             child = current.left
    //         } else {
    //             child = current.right
    //          }
    //         // current is the left child of previous
    //         if (previous.left === current) {
    //             previous.left = child
    //         } 
    //     // current is the right child of previous
    //         else {
    //             previous.right = child
    //         }

    //         return this.root        
    //     }

    //     let successor = this.getSuccessor(this.root)
    //     this.root.data = successor.data
    //     this.deleteItem(successor.data)
    //     return this.root
    //     }

    //     // the node has one child left or right

        
    // }

    delNode(root, x){
        if(root === null){
            return root
        }


        if(root.data > x){
            root.left = this.delNode(root.left, x)
        }else if(root.data < x){
            root.right = this.delNode(root.right, x)
        }else{
            // Node with 0 or 1 child
            if(root.left === null){
                return root.right
            }
            if(root.right === null){
                return root.left
            }


            // Node with 2 children
            let successor = this.getSuccessor(root)
            root.data = successor.data
            root.right = this.delNode(root.right, successor.data)
        }

        return root    
    }


    // traverse level order
    levelOrderForEach(callback){
        let root = this.showTree()

        this.showError(callback)

        if(root ===  null){
            return
        }

        let queque = [root]

        while(queque.length !== 0){
            
            let current = queque.shift()

            callback(current.data)

            // if left child exist
            if(current.left !== null){
                queque.push(current.left)
            }

            // if right child exist
            if(current.right !== null){
                queque.push(current.right)
            }
        }
    
    }



    inOrderForEach(root, callback){
        this.showError(callback)

        if(root === null){
            return
        }

        this.inOrderForEach(root.left, callback)
        callback(root.data)
        this.inOrderForEach(root.right, callback)
    }

    preOrderForEach(root, callback){
        this.showError(callback)

        if(root === null){
            return
        }

        callback(root.data)
        this.inOrderForEach(root.left, callback)
        this.inOrderForEach(root.right, callback)

    }


    postOrderForEach(root, callback){
         this.showError(callback)

        if(root === null){
            return
        }

        this.inOrderForEach(root.left, callback)
        this.inOrderForEach(root.right, callback)
        callback(root.data)

    }

    // count the value from root
    depth(value){
        if(!this.includes(value)){
            return undefined
        }else{
            this.depthCount = 0
            this.includes(value)
            return this.depthCount
        }

    }


    // count the current value to leaf node
    height(value){
        if(!this.includes(value)){
            return undefined
        }else{

        }
    }

    // helper function to throw error is a callback is not provided
    showError(x){
        if(!x){
            throw new Error('A callback is required')
        }
    }


    showTree(){
        return this.root
    }
}



const neem = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
const rootNode = neem.showTree()

// console.log(neem.showTree())
// console.log(neem.insert(45))
// console.log(neem.insert(6))
// console.log(neem.showTree())
// neem.prettyPrint(rootNode)
// console.log("==============================")
// neem.delNode(rootNode,1)
// neem.prettyPrint(rootNode)
// console.log("==============================")
// neem.delNode(rootNode,8)
// neem.prettyPrint(rootNode)
// console.log("==============================")
// // neem.levelOrderForEach()
// // neem.levelOrderForEach((value)=>{
// //     console.log(value)
// // })

// neem.inOrderForEach(rootNode, (value)=> console.log(value * 1))
// console.log("==============================")
// neem.preOrderForEach(rootNode, (value)=> console.log(value * 1))
// console.log("==============================")
// neem.postOrderForEach(rootNode, (value)=> console.log(value * 1))
neem.delNode(rootNode,1)
neem.prettyPrint(rootNode)
console.log(neem.depth(8))
console.log(neem.depth(4))
console.log(neem.depth(67))
console.log(neem.depth(5))
console.log(neem.depth(7))