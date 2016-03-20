/**
 * Created by pkdo10 on 12/26/2015.
 */
angular.module('storyService', [])

.service('Story', function($http){

        this.create = function(storyData){
            return $http.post('/api', storyData);
        };

        this.allStory = function(){
            return $http.get('/api');
        };
})

.factory('socketIO', function($rootScope){

        var socket = io.connect();

        return {
            on: function(eventName, callback){
                socket.on(eventName, function(){
                    var args = arguments;
                    $rootScope.$apply(function(){
                        callback.apply(socket, args);
                    });
                });
            },

            emit: function(eventName, data, callback){
              socket.emit(eventName, data, function(){
                  var args = arguments;
                  $rootScope.$apply(function(){
                      if(callback){
                          callback.apply(socket, args);
                      }
                  })
              })
            }
        }
});
