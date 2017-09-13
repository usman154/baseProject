/**
 * Created by mumar on 1/7/2016.
 */

(function ()
{
  'use strict';

  angular
    .module('app.user', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, msNavigationServiceProvider)
  {
    // State
    $stateProvider.state('app.user', {
      url      : '/user',
      views    : {
        'content@app': {
          templateUrl: 'app/user/list.html',
          controller : 'UserController as vm'
        }
      },
      resolve  : {
      }/*,
      bodyClass: 'todo'*/
    });
    $stateProvider.state('app.user.details', {
      url      : '/:id',
      views    : {
        'detailsContent@app': {
          templateUrl: 'app/user/list.html',
          controller : 'userController as vm'
        }
      },
      resolve  : {

      }/*,
       bodyClass: 'todo'*/
    });


    //if(window.localStorage.getItem('userRole')==='admin'){
      // Navigation
      // msNavigationServiceProvider.saveItem('user', {
      //   title : 'Users',
      //   icon  : 'icon-account',
      //   state:'app.user'
      // });
   // }


  }

})();
