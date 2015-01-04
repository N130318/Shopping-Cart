/**
 * Created by namita on 1/1/15.
 */
var shoppingModule = angular.module('shopping', []);

shoppingModule.controller('ShoppingController', ["$scope", "$http", function ($scope, $http) {
    $http.get('products.json')
        .success(function (response) {
            $scope.products = angular.copy(response);
            console.log(response);
        })
        .error(function (error) {
            console.log(error);
        });
    $scope.cartItems = [];
    $scope.addToCart = function (id) {
        for (var index = 0; index < $scope.products.length; index++) {
            if ($scope.products[index].id == id) {
                var productCopy = angular.copy($scope.products[index]);
                var ifProductExists = false;
                for (var i = 0; i < $scope.cartItems.length; i++) {
                    if ($scope.cartItems[i].id == id) {
                        $scope.cartItems[i].quantity++;
                        ifProductExists = true;
                    }
                }
                if (ifProductExists == false) {
                    productCopy.quantity = 1;
                    $scope.cartItems.push(productCopy);
                }
            }
        }
        calculateTotal();
    }
    $scope.updateQuantity = function (id, watchChange) {
        for (var j = 0; j < $scope.cartItems.length; j++) {
            if ($scope.cartItems[j].id == id) {
                if (watchChange == false) {
                    $scope.cartItems[j].quantity = $scope.cartItems[j].quantity - 1;
                    if ($scope.cartItems[j].quantity < 1) {
                        $scope.cartItems.splice(j, 1);
                    }
                }
                else if (watchChange == true) {
                    $scope.cartItems[j].quantity++;
                    if ($scope.cartItems[j].quantity > 10) {
                        $scope.cartItems[j].quantity = 10;
                    }
                }
            }
        }
        calculateTotal();
    }
    var calculateTotal = function () {
        $scope.total = 0;
        for (var k = 0; k < $scope.cartItems.length; k++) {
            var tempTotal = $scope.cartItems[k].quantity * $scope.cartItems[k].price;
            $scope.total = tempTotal + $scope.total;
        }
    }
}]);