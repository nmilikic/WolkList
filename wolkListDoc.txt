// PAGE CONTROLLER *******************

// Config WolkList
======================================

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


// List data structure
=======================================

vm.listData = [
    {
        id: 1,
        name: 'Whatever',
        checked: true
    },
    {
        id: 2,
        name: 'Whatever',
        checked: true
    }
// ...
];

// HTML PAGE **************************

<wolk-list config-list="main.configWolkList" list-items="main.listData"></wolk-list>
