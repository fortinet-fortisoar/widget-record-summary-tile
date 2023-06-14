'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('situationalAwarenessWidget100Ctrl', situationalAwarenessWidget100Ctrl);

    situationalAwarenessWidget100Ctrl.$inject = ['$scope', 'PagedCollection'];

    function situationalAwarenessWidget100Ctrl($scope, PagedCollection) {

        $scope.widgetData = {};
        $scope.sizeType = '';

        init();
        function init() {
            fetchJsonData();
        }


        function fetchJsonData() {
            var filters = {
                query: $scope.config.query
            };
            var pagedTotalData = new PagedCollection($scope.config.customModule, null, null);
            pagedTotalData.loadByPost(filters).then(function () {
                if (pagedTotalData.fieldRows.length === 0) {
                    $scope.filterValidation = true;
                    return;
                }
                $scope.widgetData = pagedTotalData.fieldRows[0][$scope.config.customModuleField].value;
                if ($scope.widgetData.hasOwnProperty('data')) {
                    $scope.sizeType = 'large';
                }
                else {
                    $scope.sizeType = 'small';
                }
            })
        }
    }
})();
