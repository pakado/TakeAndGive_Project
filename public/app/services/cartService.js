/**
 * Created by pkdo10 on 3/22/2016.
 */
angular.module('cartService', [])

    .service('getCartImage', function($http){

        this.all = function(username){
            return $http.get('/api/getCartImage/' + username).success( function(data){
                return data;
            });
        };
//time in cart
      /* this.validateImageTime = function(){
            return $http.post('/api/validateImageTime/').success( function(data){
                return data;
            });
        }
*/
    });