'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('editRecordSummaryTile100Ctrl', editRecordSummaryTile100Ctrl);

    editRecordSummaryTile100Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'appModulesService', 'Entity', 'modelMetadatasService'];

    function editRecordSummaryTile100Ctrl($scope, $uibModalInstance, config, appModulesService, Entity, modelMetadatasService) {
        $scope.cancel = cancel;
        $scope.save = save;
        $scope.config = config;
        $scope.loadAttributesForCustomModule = loadAttributesForCustomModule;
        $scope.jsonObjModuleList=[];

        init();
        function init() {
            appModulesService.load(true).then(function (modules) {
                $scope.modules = modules;

                //Create a list of modules with atleast one JSON field
                modules.forEach((module, index) => {
                    var moduleMetaData = modelMetadatasService.getMetadataByModuleType(module.type);
                    for (let fieldIndex = 0; fieldIndex < moduleMetaData.attributes.length; fieldIndex++) {
                        //Check If JSON field is present in the module
                        if (moduleMetaData.attributes[fieldIndex].type === "object") {
                            $scope.jsonObjModuleList.push(module);
                            break;
                        }
                    }
                })
            })
        }
        if ($scope.config.customModule) {
            $scope.loadAttributesForCustomModule();
        }
        function loadAttributesForCustomModule() {
            $scope.fields = [];
            $scope.fieldsArray = [];
            $scope.objectFields = [];
            var entity = new Entity($scope.config.customModule);
            entity.loadFields().then(function () {
                for (var key in entity.fields) {
                    //filtering out JSON fields 
                    if (entity.fields[key].type === "object") {
                        $scope.objectFields.push(entity.fields[key]);
                    }
                }
                $scope.fields = entity.getFormFields();
                angular.extend($scope.fields, entity.getRelationshipFields());
                $scope.fieldsArray = entity.getFormFieldsArray();
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            if ($scope.editRecordSummaryTile.$invalid) {
                $scope.editRecordSummaryTile.$setTouched();
                $scope.editRecordSummaryTile.$focusOnFirstError();
                return;
              }
            $uibModalInstance.close($scope.config);
        }
    }
})();
