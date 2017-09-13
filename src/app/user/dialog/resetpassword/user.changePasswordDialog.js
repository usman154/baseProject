/**
 * Created by mumar on 3/9/2016.
 */
(function(){
  'use strict';
  angular
    .module('app.user')
    .controller('ChangePasswordDialogController',changePasswordDialogController);

  function changePasswordDialogController($mdDialog,username,userService){

    var vm = this;

    vm.closeDialog = closeDialog;
    vm.resetPassword=resetPassword;

    function  resetPassword(user){
      var params = {username:username,currentpassword:user.password}
      userService.resetPassword(params).then(function(response){
        $mdDialog.hide(username);
      },function(error){
         console.log(error);
      })
    }

    function closeDialog(){
      $mdDialog.hide();
    }
  }

})();
