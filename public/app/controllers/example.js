/**
 * Created by pkdo1 on 12/8/2015.
 */
angular.module('example',[])
    .controller('ExampleController', [ function() {
        var vm = this;
        vm.list = [];
        vm.text = 'hello';
        vm.text1 = 'hello';
        vm.Istrue = true;
        vm.do = function(){
            vm.Istrue = !vm.Istrue;
        }
        vm.submit = function() {
            if (vm.text) {
                vm.list.push( vm.text);
                vm.text = '';
            }
        };
    }]);