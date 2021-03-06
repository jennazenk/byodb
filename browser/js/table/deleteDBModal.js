app.controller('deleteDBCtrl', function ($scope, $uibModal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'deleteDBContent.html',
      controller: 'deleteDBInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

app.controller('deleteDBInstanceCtrl', function ($scope, $uibModalInstance, items, TableFactory, HomeFactory, $stateParams, $state) {


  $scope.dropDbText = 'DROP DATABASE'
  $scope.dbName = $stateParams.dbName;

  $scope.deleteTheDb = function(){
    $uibModalInstance.close($scope.selected.item);
    TableFactory.deleteDb($scope.dbName)
    .then(function(){
      HomeFactory.deleteDB($scope.dbName)
    })
    .then(function() {
      $state.go('Home', {}, {reload : true})
    })
  }

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});