/**
 * Created by pkdo10 on 3/25/2016.
 */
angular
    .module('directiveCollapseApp',[])
    .directive('btnAutoCollapse', directive);

    function directive() {
        var dir = {
            restrict: 'A',
            scope: {},
            link: link
    };
    return dir;

    function link(scope, element, attrs) {
        element.on('click', function(event) {
            $(".navbar-collapse").collapse('hide');
        });
    }
}