<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Wolk-List - Angular component</title>
</head>
<body>

    <h3>// PAGE CONTROLLER</h3>
    <h4>Config WolkList</h4>

    <pre>
        vm.configWolkList = {
            search: false, <span style="color: blue">// Search visibility</span>
            title: {
                visible: false, <span style="color: blue">// Title visibility, naming</span>
                titleName: "List name"
            },
            checkbox: true, <span style="color: blue">// Checkbox visibility</span>
            pagination: {
                visible: false, <span style="color: blue">// Pagination visibility, dropdown manu values</span>
                itemsPerPage: [3, 6, 9, 12, 15]
            }
        };
    </pre>

    <h4>List data structure</h4>

    <pre>
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
    </pre>

    <h3>// HTML PAGE</h3>

    <xmp>
        <wolk-list config-list="main.configWolkList" list-items="main.listData"></wolk-list>
    </xmp>
    
</body>
</html>