(function() {
  'use strict';

  angular
    .module('wolkDirective')
    .directive('wolkList', wolkList)
    .filter('startFrom', function() {
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        };
    });

  /** @ngInject */
  function wolkList() {
      var directive = {
        restrict: 'E',
        templateUrl: 'app/components/wolkList/wolkList.html',
        scope: {
            configList: '=',
            listItems: '='
        },
        controller: WolkListController,
        controllerAs: 'vm',
        bindToController: true
      };

      return directive;

    /** @ngInject */
      function WolkListController($filter, startFromFilter) {

          var vm = this;

          function init() {
            vm.pageSize = 10;
            vm.currentPage = 0;

            if (vm.configList.pagination.visible === false) {
              vm.pageSize = vm.listItems.length;
            }
          }

          //Default config object

          vm.configWolkList = {
            search: true,
            title: {
              visible: true,
              titleName: "User group"
            },
            checkbox: true,
            pagination: {
              visible: true,
              itemsPerPage: [5,10,15,20]
            }
          };

          function emptyArray () {
            if(vm.listItems.pagination.itemsPerPage.length > 1) {
              vm.configWolkList.pagination.itemsPerPage = [];
            }
          }

          // Update config object
          // =======================================================

          function update(obj/*, …*/) {
              for (var i=1; i<arguments.length; i++) {
                  for (var prop in arguments[i]) {
                      var val = arguments[i][prop];
                      if (typeof val == "object") // this also applies to arrays or null!
                          update(obj[prop], val);
                      else
                          obj[prop] = val;
                  }
              }
              return obj;
          }

          update(vm.configWolkList, vm.configList);

          // =======================================================
                
          init ();
  
          vm.getData = function () {
            return $filter('filter')(vm.listItems);
          };

          vm.numberOfPages = function (){
            return Math.ceil(vm.getData().length/vm.pageSize);                
          };

          //Ordering list

          vm.up = true;
          vm.down = false;
          vm.temp = 'name';

          vm.descendingOrder = function () {
            vm.up = (vm.up) ? false: true;
            vm.down = (vm.down) ? false: true;
            vm.temp = (vm.temp === 'name') ? '-name': 'name';
          };

      }

  }

})();