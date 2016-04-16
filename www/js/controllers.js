angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.name = "Nicolas";
  console.log( $scope.name );
})

.controller('WorkshopCtrl', function($scope, $ionicPopup, $ionicActionSheet, UsersService, $ionicLoading, $cordovaCamera){
  //Attributes
  $scope.twitter = "@nicobytes";
  $scope.image = null;
  //Functions
  $scope.showAlert = showAlert;
  $scope.showOptions = showOptions;
  $scope.takePhoto = takePhoto;
  

  $ionicLoading.show();

  UsersService.getAllUsers()
  .then(function( response ){
    $ionicLoading.hide();
    $scope.users = response.data.results;
  });

  function takePhoto(){
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture( options )
    .then(function( imageData ){
      $scope.image = "data:image/jpeg;base64," + imageData;
    })
    .catch(function(error){
      console.log(error);
    });
  }

  function showAlert(){
    $ionicPopup.alert({
      title: "Hombres G",
      subTitle: "2002",
      template: "Lo noto",
      okText: "Aceptar",
      okType: "button-dark"
    });
  }

  function showOptions(){
    $ionicActionSheet.show({
      buttons: [
        { text: " <i class='ion-share'></i> share" },
        { text: "edit" }
      ]
    });
  }

  

});