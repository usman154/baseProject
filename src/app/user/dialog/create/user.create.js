/**
 * Created by mumar on 3/9/2016.
 */
(function(){
  'use strict';
  angular
    .module('app.user')
    .controller('UserCreateDialog',userCreateDialog);

  function userCreateDialog($mdDialog,userService,utilCustom,$rootScope,$filter,roles){
     var vm = this;
    vm.closeDialog = closeDialog;
    vm.saveUser = saveUser;
    vm.roles=roles;



    function saveUser(user){
      var userCreated = $rootScope._user;
      var params = {roles:Number(user.roles[0].id),username:user.username,password:user.password,email:user.email,fullName:user.fullName,isActive:user.isActive,createdBy:{id:userCreated.id}};
      userService.get_api.save(params,function(response){
        utilCustom.toaster($filter('translate')('user.user') +"{" +user.username+"}"+$filter('translate')('data.created') );
        $mdDialog.hide(response);
      },function(error){
        console.log(error);
        utilCustom.toaster($filter('translate')('data.createError')+' '+$filter('translate')('user.user'));
      });
    }
    function closeDialog(){
      $mdDialog.hide();
    }
  }

})();
