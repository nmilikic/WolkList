## WolkList Angular Component

An AngularJS directive which adds list of items to your page. It includes checkboxes, search filtering and pagination. Every list component can be disabled/enabled.

#### // PAGE CONTROLLER
#### Config WolkList

```sh
        vm.configWolkList = {
            search: false, // Search visibility
            title: {
                visible: false, // Title visibility, naming
                titleName: "List name"
            },
            checkbox: true, // Checkbox visibility
            pagination: {
                visible: false, // Pagination visibility, dropdown manu values
                itemsPerPage: [3, 6, 9, 12, 15]
            }
        };
```
#### List data structure

```sh
        vm.listData = [
            {
                id: 1,
                name: 'String',
                checked: true
            },
            {
                id: 2,
                name: 'String',
                checked: true
            }
        // ...
        ];
```
#### // HTML PAGE

```sh
        <wolk-list config-list="main.configWolkList" list-items="main.listData"></wolk-list>
```

#### See WolkList sample

[WolkList Sample](https://jsfiddle.net/nmilikic/wt4zbvfy/10/)