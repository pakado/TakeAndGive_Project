/**
 * Created by pkdo10 on 12/27/2015.
 */
myApp.controller('chatCtrl', ['$scope', 'Socket', function($scope, Socket) {
    Socket.connect();

    $scope.$on('$lochationChangeStart', function (event) {
        socket.disconnect(true);
    })
}])
