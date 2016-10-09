// Use case - test for BST in Node.js(Also works in browser)
var BST = require('./BST.js');
var bTree = BST.createBST();
bTree.insert(4);
bTree.insert(2);
bTree.insert(7);
bTree.insert(3);
bTree.insert(1);
bTree.insert(5);
bTree.insert(6);

console.log(bTree.root.data); // 4
console.log(bTree.root.right.data); // 5

console.log(bTree.search(1)); // true
console.log(bTree.search(8)); // false
//Traverse Tree inorder
console.log('The inorder traversal for BST:');
var sum = 0;
bTree.traverse(function(node){
	console.log(node.data);
	sum += node.data;
});
console.log('The sum of all Items is ' + sum);
// Compute the size of bTree
console.log('The size of BST is '+bTree.size());