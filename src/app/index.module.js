(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Common 3rd Party Dependencies
             'uiGmapgoogle-maps',
            'textAngular',
            'xeditable',
            // Core
            'app.core',

            'app.utilsCustom',
            // Navigation
            'app.navigation',
            // Toolbar
            'app.toolbar',
            // Quick Panel
            'app.quick-panel',
          'app.auth',
            'app.appSetting',
            'app.user'
        ]);

})();
