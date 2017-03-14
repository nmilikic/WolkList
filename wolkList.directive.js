(function() {
  'use strict';

  angular
    .module('wolkList',[])
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
        template: 
                      `
                      <md-list class="wolkListWrapper" ng-cloak>  
                            <md-input-container md-no-float layout-margin class="md-block" ng-show="vm.configWolkList.search">
                                <input ng-model="listItem.name" placeholder="Search">
                            </md-input-container>
                            <md-subheader class="md-no-sticky wolkListTitle" ng-if="vm.configWolkList.title.visible">{{ vm.configWolkList.title.titleName }} <i class="material-icons sortByItem" ng-show="vm.up" ng-click="vm.descendingOrder()">expand_less</i><i class="material-icons sortByItem" ng-show="vm.down" ng-click="vm.descendingOrder()">expand_more</i></md-subheader>
                            <md-list-item class="wolkListItem" ng-repeat="listItem in vm.listItems | filter:listItem.name | startFrom:vm.currentPage*vm.pageSize | limitTo:vm.pageSize | orderBy : vm.temp">
                                <p> {{ listItem.name }} </p>
                                <md-checkbox class="md-secondary wolkListCheckbox" ng-model="listItem.checked" ng-if="vm.configWolkList.checkbox"></md-checkbox>
                                <md-divider layout-margin></md-divider>
                            </md-list-item>
                            <md-list-item class="wolkListPaginationContainer" ng-if="vm.configWolkList.pagination.visible">
                                <md-content class="wolkListPaginationItems" flex="15" layout="row" layout-align="center center">
                                    <p class="wolkListFooterParagraph">Page:<span>{{ vm.currentPage + 1 }}</span></p>
                                </md-content>
                                <md-content class="wolkListPaginationItems" flex="15" layout="row" layout-align="center center">
                                    {{ vm.currentPage + 1 }} of {{ vm.numberOfPages() }}
                                </md-content>
                                <md-input-container flex="50" layout="row" layout-align="center center"  style="margin: 0;">
                                    <p class="wolkListFooterParagraph">Rows per page:</p>
                                    <md-select name="type" ng-model="vm.pageSize" required>
                                        <md-option ng-repeat="boxValue in vm.configWolkList.pagination.itemsPerPage" value="{{ boxValue }}">{{ boxValue }}</md-option>
                                    </md-select>
                                </md-input-container>
                                <md-content class="wolkListPaginationItems" flex="20" layout="row" layout-align="end center">
                                    <md-button class="wolkListFooterButton" ng-disabled="vm.currentPage === 0" ng-click="vm.currentPage=vm.currentPage - 1">
                                        <md-icon md-font-set="material-icons">chevron_left</md-icon>
                                    </md-button>
                                    <md-button class="wolkListFooterButton" ng-disabled="vm.currentPage >= vm.getData().length/vm.pageSize - 1" ng-click="vm.currentPage=vm.currentPage + 1">
                                        <md-icon md-font-set="material-icons">chevron_right</md-icon>
                                    </md-button>
                                </md-content>
                            </md-list-item>
                        </md-list>
                      `,
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