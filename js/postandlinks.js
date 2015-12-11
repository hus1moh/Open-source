var app = angular.module('postsandlinks', ['ngRoute', 'firebase']);

app.constant('fbURL', 'https://reddnews.firebaseio.com/');

app.factory('Posts', function($firebase, fbURL) {
	return $firebase(new Firebase(fbURL)).$asArray();
});

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'MainController',
		templateUrl: 'postandlinks.html'
	}) 
		 .otherwise ({
		 redirectTo: '/'
		 })
 });
 
 app.controller('MainController', function($scope, $firebase, Posts) {
	
	$scope.posts = Posts;
	//below saves input values, adds to db and for presentation 
	$scope.savePost = function(post) {
		if(post.name && post.description && post.url && $scope.authData) {
		Posts.$add({
			name: post.name,
			description: post.description,
			url: post.url,
			votes: 0, //votes start at 0 for any submission
			user: $scope.authData.twitter.username
		}); //below sets field inputs to " " after submission
			post.name = "";
			post.description = "";
			post.url = "";
		}
		else { //Informs the user to fill in more information in the fields
			alert('More information is required to submit this post')
		}
	}			//Here we add votes to the "links" provided by users
			$scope.addVote = function(post) {
				//below will increase the amount of votes by 1 when clicked, "++"
				//votes are currently 'spamable', no limit from an individual user
				post.votes++;
				//Stores data into our DB(https://reddnews.firebaseio.com/)
				Posts.$save(post);
		}
			//How to delete a post. This section is commented because even though the code works, it grants all users the ability to delete, 
	//		$scope.deletePost = function(post){		...working on restricting this privilege. 
			//below retrieving the correct URL for deletion
//				var postForDeletion = new Firebase('https://reddnews.firebaseio.com/' + post.$id);
				//Removal of designated URL from the DB(https://reddnews.firebaseio.com/) 
//				postForDeletion.remove(); 
//	}
			//code for submission of comments related to a certain link
			//in order to comment you must login via twitter
			//submitted comments will display content(the actual text) of said comment and ID(twitter account)
			//which can be clicked upon and will redirect to twitter profile
			$scope.addComment = function(post, comment) {
				if($scope.authData) {
					var ref = new Firebase('https://reddnews.firebaseio.com/' + post.$id + '/comments');
					var sync = $firebase(ref);
					$scope.comments = sync.$asArray();
					$scope.comments.$add({
						user: $scope.authData.twitter.username,
						text: comment.text
			});
			}
				else { //if you try to comment without twitter login
					alert('For that a Twitter account is needed.')
		}
			
	}
			//Login function via use of Twitter-accounts
			$scope.login = function() {
				//Establishing a path to the URL with the DB
				var ref = new Firebase("https://reddnews.firebaseio.com/");
				//Creating the OAuthPopup
				ref.authWithOAuthPopup("twitter", function(error, authData) {
				//Any errors regarding the login will end up in an error msg
				if (error) {
					alert("Error has been bestowed upon you", error);
				} 	
				else { //if no error while login the success-msg
					console.log('Sucessful login');
				}
					$scope.authData = authData
   
	
	});
	}
	
 });