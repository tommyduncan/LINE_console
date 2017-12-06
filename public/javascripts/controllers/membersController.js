angular.module('LINE_console').controller('MembersController', function ($scope, MemberService) {
    /*MemberService.getMembers((result)=>{
        console.log(result);
    });*/

    $scope.mainGridOptions = {
        dataSource: {
            transport: {
                read: "/member", 
                dataType: "json"
            },
            pageSize: 20
        },
        height: 550,
        groupable: true,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [{
            /*template: "<div class='customer-photo'" +
                "style='background-image: url(../content/web/Customers/#:data.CustomerID#.jpg);'></div>" +
                "<div class='customer-name'>#: ContactName #</div>",*/
            field: "firstName",
            title: "名字",
            width: 240
        }, {
            field: "lastName",
            title: "姓氏"
        }, {
            field: "phone",
            title: "連絡電話"
        }, {
            field: "email",
            title: "電子郵件", 
            width: 150
        }]
    };

    /* $scope.detailGridOptions = function(dataItem) {
        return {
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 5,
                filter: { field: "EmployeeID", operator: "eq", value: dataItem.EmployeeID }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
            { field: "OrderID", title:"ID", width: "56px" },
            { field: "ShipCountry", title:"Ship Country", width: "110px" },
            { field: "ShipAddress", title:"Ship Address" },
            { field: "ShipName", title: "Ship Name", width: "190px" }
            ]
        };
    }; */
});