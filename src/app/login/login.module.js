(function ()
{
    'use strict';

    angular
        .module('app.auth', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {

      $translatePartialLoaderProvider.addPart('translations/');
        // State
        $stateProvider.state('app.pages_auth_login', {
            url      : '/login',
            views    : {
                'main@'                       : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_login': {
                    templateUrl: 'app/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'login'
        });

        // Translation


        // Navigation

       /* msNavigationServiceProvider.saveItem('login', {
            title : 'Login',
            state : 'app.pages_auth_login',
            weight: 1
        });*/

    }

})();
