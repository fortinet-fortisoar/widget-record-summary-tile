'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('recordSummaryTile100Ctrl', recordSummaryTile100Ctrl);

    recordSummaryTile100Ctrl.$inject = ['$scope', 'PagedCollection', '$rootScope', '$timeout'];

    function recordSummaryTile100Ctrl($scope, PagedCollection, $rootScope, $timeout) {

        $scope.widgetData = {};
        $scope.sizeType = '';
        $scope.filterValidation = false;
        var recordNotFound = "Record not found";
        var incorrectJson = "Incorrect JSON";
        var incorrectFormat = "Incorrect Format";

        init();

        function init() {
            $scope.currentTheme = $rootScope.theme.id;

            fetchJsonData();
                if ($scope.currentTheme === 'light') {
                    var textElements = document.getElementsByName("situationalCardValue");
                    for (var i = 0; i < textElements.length; i++) {
                        textElements[i].style.color = '#151515';
                    }
                }
        }

        function fetchJsonData() {
            var filters = {
                query: $scope.config.query
            };
            var pagedTotalData = new PagedCollection($scope.config.customModule, null, null);
            pagedTotalData.loadByPost(filters).then(function () {
                if (pagedTotalData.fieldRows.length === 0) {
                    $scope.filterValidation = true;
                    $scope.errorMessage =  recordNotFound;
                    return;
                }
                var data = pagedTotalData.fieldRows[0][$scope.config.customModuleField].value;
                if ($scope.config.keyForCustomModule) {
                    var nestedKeysArray = $scope.config.keyForCustomModule.split('.');
                    nestedKeysArray.forEach(function (value) {
                        data = data[value];
                    })
                }
                if(data){
                    if (typeof data === 'object' && data.hasOwnProperty('title')) {
                        $scope.widgetData = data;
                        //If data is found use large class
                        if ($scope.widgetData.hasOwnProperty('data')) {
                            $scope.sizeType = 'large';
                        }
                        else {
                            $scope.sizeType = 'small';
                        }
                    }
                    else{
                        $scope.filterValidation = true;
                        $scope.errorMessage =  incorrectFormat;
                    }

                }
                else{
                    $scope.filterValidation = true;
                    $scope.errorMessage = incorrectJson;
                    return;
                }
            })
        }
    }
})();
