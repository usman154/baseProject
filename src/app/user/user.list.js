/**
 * Created by mumar on 1/7/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserController', UserController);


    function UserController(utilCustom, $log, $document, $filter, userService, $mdDialog, $rootScope) {
        var vm = this;


        vm.selectedUser = selectedUser;
        vm.addNewSkill = addNewSkill;
        vm.resetPassword = resetPassword;
        vm.iniIt = iniIt;
        vm.create = create;
        vm.update = update;
        vm.findUser = findUser;
        vm.deleteUser = deleteUser;


        function iniIt() {
            utilCustom.toasterLoading();
            userService.list().then(function(respond) {
                vm.userList = respond;
                angular.forEach(vm.userList, function(value, key) {
                    if (vm.userList.length - 1 == key)
                        utilCustom.hideToaster();
                    if (value.profileExists)
                        vm.userList[key].avatar = window.appBaseUrl + '/images/agents/' + angular.lowercase(value.username) + '.jpg?timestamp=' + new Date().getTime();
                    else
                        vm.userList[key].avatar = '/efadminpanel/assets1/images/avatars/profile.jpg?timestamp=' + new Date().getTime();

                });
            }, function(error) {
                console.log(error);
            });
        }
        if (window.userRole == 'admin') {
            vm.authorizationRequires = false;
            iniIt();
            getRoles();
        } else {
            vm.authorizationRequires = true;
        }

        vm.selectedUserIndex = undefined;
        vm.selectUserIndex = function(index) {
            if (vm.selectedUserIndex !== index) {
                vm.selectedUserIndex = index;
            } else {
                vm.selectedUserIndex = undefined;
            }
        };

        function findUser(id) {
            var userFound = $filter('filter')(vm.userList, { id: id });
            if (userFound)
                return userFound[0].username;
        };

        function getRoles() {
            userService.getRoles('').then(function(response) {
                vm.roles = response;
            }, function(error) {
                console.log(error)
            })
        }

        function create(event) {
            $mdDialog.show({
                controller: 'UserCreateDialog',
                controllerAs: 'vm',
                templateUrl: 'app/user/dialog/create/create.html',
                parent: angular.element($document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                locals: {
                    event: event,
                    roles: vm.roles
                }
            }).then(function(res) {
                if (res != undefined)
                    vm.userList.push(res);

            })
        };

        function resetPassword(user, event) {
            $mdDialog.show({
                controller: 'ChangePasswordDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/user/dialog/resetPassword/resetPassword.html',
                parent: angular.element($document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                locals: {
                    username: user.username,
                    event: event
                }
            }).then(function(res) {
                if (res != undefined)
                    utilCustom.toaster('Password has been reset for ' + res);
            })
        };

        function selectedUser(user) {
            vm.user = user;
        };

        function update(user) {
            var userCreated = $rootScope._user;
            var params = { id: user.id, roles: Number(user.roles[0].id), email: user.email, fullName: user.fullName, isActive: user.isActive, updatedBy: { id: userCreated.id } };
            userService.update(params).then(function(response) {
                utilCustom.toaster($filter('translate')('user.user') + "{" + user.username + "}" + $filter('translate')('data.updated'));
                var userIndex = _.findIndex(vm.userList, { id: user.id });
                vm.userList[userIndex] = response;
                if (response.profileExists)
                    vm.userList[userIndex].avatar = window.appBaseUrl + '/images/agents/' + angular.lowercase(response.username) + '.jpg?timestamp=' + new Date().getTime();
                else
                    vm.userList[userIndex].avatar = '/efadminpanel/assets1/images/avatars/profile.jpg?timestamp=' + new Date().getTime();

            }, function(error) {
                console.log(error);
                utilCustom.toaster($filter('translate')('data.updateError') + ' ' + $filter('translate')('user.user'));
            });
        };

        function deleteUser(user) {
            utilCustom.toasterConfirm().then(function(response) {
                if (response == 'ok' || response) {
                    var params = { id: user.id };
                    userService.delete(params).then(function(response) {
                        utilCustom.toaster($filter('translate')('user.user') + "{" + user.username + "}" + $filter('translate')('data.deleted'));

                        _.remove(vm.userList, function(us) {
                            return us.id === user.id;
                        })

                    }, function(error) {

                        utilCustom.toaster($filter('translate')('data.deleteError') + ' ' + $filter('translate')('user.user'));
                    });
                } else {
                    utilCustom.toaster($filter('translate')('generic.noOptionSelected'));
                }
            })

        }

        function addNewSkill() {
            var newSkill = vm.agent.skillId.pop();
            var foundSkill = _.find(skillList, { name: newSkill });
            if (foundSkill === undefined) {
                var count = skillList.length + 1;
                skillList.push({ id: count, name: newSkill });
                vm.agent.skillId.push({ id: count });

            }
        };



    }







})();
