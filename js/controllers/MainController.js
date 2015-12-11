
app.controller('MainController', ['$scope', function($scope) { 
  $scope.text = 'Welcome to the IT portal! Here you can find som interesting new books'; 

  $scope.products = [
  	{ 
    	name: 'Web Design With HTML and CSS', 
    	price: 59, 
    	pubdate: new Date('2014', '03', '08'), 
    	cover: 'https://www.agitraining.com/sites/default/files/dc-books/webdesign_details.jpg'
    
  	}, 
  	{ 
    	name: 'Head First Software Developement', 
    	price: 12.99, 
    	pubdate: new Date('2013', '08', '01'), 
    	cover: 'http://ecx.images-amazon.com/images/I/51bAdirnA%2BL._SX258_BO1,204,203,200_.jpg'
    
  	}, 
  	{ 
    	name: 'Expert Oracle Database Architecture', 
    	price: 29.99, 
    	pubdate: new Date('1999', '07', '08'), 
    	cover: 'http://allthingsoracle.com/wp-content/uploads/2012/04/expert-oracle-database-architecture-cover.png'
    	
  	}
  ];
  $scope.plusOne = function(index) { 
  	$scope.products[index].likes += 1; 
  
	};
	
	
	
}]);


 
	app.controller('commentApp', ['$scope','Comment', function($scope,Comment){
		$scope.user="Guest";
		$scope.comments= Comment.all;
		$scope.submit = function(comment){ Comment.create(comment);
		};
}]);
 
app.factory('Comment', ['$firebase',
	function($firebase) {
	var ref = new Firebase('https://colchat.firebaseio.com/');
	var comments = $firebase(ref.child('comments')).$asArray();

	var Comment = {
		all: comments,
		create: function (comment) {
			return comments.$add(comment);
		},
		get: function (messageId) {
			return $firebase(ref.child('comments').child(messageId)).$asObject();
		},
		delete: function (comment) {
			return comments.$remove(comment);
		}
	};

	return Comment;

}
]);


