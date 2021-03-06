angular.module("chatCtrl", ['authService'])

	.factory("socket", function(){
		//var socket = io.connect('http://localhost:3000/');
		//var socket = io.connect('https://morning-fjord-34230.heroku.com/');
	   	  var socket = io.connect('https://morning-fjord-34230.herokuapp.com/');
		//var socket = io.connect('https://quiet-island-60014.heroku.com/');
		return socket;
	})

	.filter('notMe', function () {
		return function (input, scope) {
			return input == scope.name ? "" : input;
		}
	})

	.controller("chatController", ['$scope','socket', '$location', '$anchorScroll','Auth', function($scope,socket, $location, $anchorScroll,Auth ){

		var vm = this;
		vm.patner = '';
		vm.name = '';
		vm.msgs = [];
		vm.onlineUsers = [];
		vm.error = '';

		vm.loginToChat = function(){
			vm.LoggedIn = Auth.lsLoggedIn();
			if(vm.LoggedIn){
				Auth.getUser().success( function(data) {
					vm.user = data;
					var username = sanitize(vm.user.username);
					var email = sanitize(vm.user.email);
					socket.emit('assign name', {name: username, email: email});
				});
			}
		};

		vm.loginToChat();

		/*vm.signup = function() {
			var name = sanitize(signupForm.userName.value);
			var email = sanitize(signupForm.userEmail.value);
			socket.emit('assign name', {name: name, email: email});
		};*/

		vm.sendMsg = function(){
			if(vm.onlineUsers.indexOf(vm.patner) == -1){
				alert("select a user");
				//vm.error = "select a user";
				return;
			}else{
				vm.error = '';
				var text = sanitizeText(textbox.msgText.value);
				if(text !== ""){
					var msgPack = {
						timestamp: Date.now(),
						text: text,
						sender: vm.patner
					};
					socket.emit('message', msgPack);
					vm.msgs.push({
						timestamp: msgPack.timestamp,
						text: text,
						sender: vm.name
					});
					textbox.msgText.value= "";
					$location.hash("bottom");
					$anchorScroll();
				}
			}
		};

		vm.patnerSelected = function(patnerName){
			if(patnerName != "No users online"){
				vm.patner = patnerName;
				socket.emit('send previous messages', patnerName);
			}
		};

		vm.isNameAssigned = function(){
			if(vm.name.length != 0)
				return true;
			else
				return false;
		};

		socket.on("load old message", function(docs){
			vm.msgs.length = 0;
			for (var index in docs){
				var sender = "patner" + docs[index].from;
				msgPack = {
					timestamp: docs[index]['timestamp'],
					text: docs[index]['text'],
					sender: docs[index][sender]
				};
			vm.msgs.push(msgPack);
			$scope.$digest();
			}
		});

		socket.on('message', function(msgPack){
			vm.msgs.push(msgPack);
		});

		socket.on('nameResult', function(result) {
			if (result.success){
				vm.name = result.name;
				if(result.message){
					//alert(result.message);
					console.log(result.message);
				}
			}else{
				//alert(result.message);
				console.log(result.message);
			}
		});

		socket.on('onlineUsers', function(onlineUsers){
			if(onlineUsers.length != 0){
				vm.onlineUsers = onlineUsers;
				$scope.$digest();
			}else{
				vm.onlineUsers = ["No users online"];
			}
		});

		var sanitize = function(input){
			input = input.trim().toLowerCase();
			input = escape(input);
			return input;
		};
		var sanitizeText = function(text){
			text = text.trim();
			return text;
		}
	}]);
