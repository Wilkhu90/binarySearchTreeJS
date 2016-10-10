(function (global) {
	//Exposed variable
	var BST = function(){
		return new BinarySearchTree();
	}
	//Internal Node constructor
	function Node(data){
		this.left = null;
		this.right = null;
		this.data = data;
	}
	// BST constructor
	function BinarySearchTree(){
		this._root = null;
		this._size = 0;
	}
	// BST insertion of numbers. TODO make it generic with Comparator
	BinarySearchTree.prototype.insert = function (num) {
		var crawl = this._root, previous, isLeft;
		if(crawl == null) {
			this._root = new Node(num);
			this._size++;
			return true;
		}
		while(crawl != null){
			previous = crawl;
			if(num > crawl.data){
				crawl = crawl.right;
				isLeft = false;
			}
			else if(num < crawl.data){
				crawl = crawl.left;
				isLeft = true;
			}
			else{
				return false;
			}
		}
		if(isLeft){
			previous.left = new Node(num);
		}
		else{
			previous.right = new Node(num);
		}
		this._size++;
		return true;
	}
	//BST search key in tree.
	BinarySearchTree.prototype.search = function(data) {
		var crawl = this._root;
		return this.searchUtil(crawl, data);
	}
	// BST search Utility.
	BinarySearchTree.prototype.searchUtil = function(crawl, data) {
		if(crawl == null) {
			return false;
		}
		if(crawl.data == data){
			return true;
		}
		else if(data > crawl.data) {
			return this.searchUtil(crawl.right, data);
		}
		else{
			return this.searchUtil(crawl.left, data);
		}
	}
	// BST traversal using inorder traversal. Accepts a call back function
	BinarySearchTree.prototype.traverse = function(cb) {
		var crawl = this._root;
		return crawl && typeof cb === 'function' ? this.inorderTraversal(crawl, cb) : null;
	}
	// BST Traversal Utility
	BinarySearchTree.prototype.inorderTraversal = function(root, cb){
		if(root.left != null)
			this.inorderTraversal(root.left, cb);

		cb.call(this, root);
		
		if(root.right != null)
			this.inorderTraversal(root.right, cb);
	}
	// BST compute size of tree.
	BinarySearchTree.prototype.size = function() {
		return this._size;
	}
	// BST Delete number from tree
	BinarySearchTree.prototype.delete = function(num) {
		var crawl = this._root, previous, isLeft, found = false;
		previous = crawl;
		while(crawl != null) {
			if(num == crawl.data){
				found = true;
				break;
			}
			previous = crawl;
			if(num > crawl.data){
				crawl = crawl.right;
				isLeft = false;
			}
			else if(num < crawl.data){
				crawl = crawl.left;
				isLeft = true;
			}
		}
		if(found){
			//If no children for node to be deleted.
			if(crawl.left == null && crawl.right == null) {
				if(isLeft)
					previous.left = null;
				else
					previous.right = null;
			}
			else if(crawl.left == null) {
				if(isLeft) {
					previous.left = crawl.right;
				}
				else {
					previous.right = crawl.right;
				}
			}
			else if(crawl.right == null) {
				if(isLeft) {
					previous.left = crawl.left;
				}
				else {
					previous.right = crawl.left;
				}
			}
			else {
				var successor = this.getSuccessor(crawl);
				if(crawl==this._root){
					this._root = successor;
				}
				else if(isLeft){
					previous.left = successor;
				}
				else{
					previous.right = successor;
				}			
				successor.left = crawl.left;
				}
			this._size--;
			return true;
		}
		return false;
	}

	//BST find successor
	BinarySearchTree.prototype.getSuccessor = function(node) {
		var successsor =null;
		var successsorParent =null;
		var current = node.right;
		while(current!=null){
			successsorParent = successsor;
			successsor = current;
			current = current.left;
		}

		if(successsor!=node.right){
			successsorParent.left = successsor.right;
			successsor.right = node.right;
		}
		return successsor;
	}

	// Append the BST to global execution context.
	global.createBST = BST;

}(this));