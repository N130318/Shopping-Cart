/**
 * Created by namita on 1/1/15.
 */
var shampoo = {name: 'Sunsilk', id: '1', price:599 };
var soap = {name: 'Lux', id: '2',price:55 };
var coffee = {name: 'Nestle', id: '3',price:100};
var chips = {name: 'Uncle Chips', id: '4',price:60};
var chocolate = {name: 'Dairy Milk', id: '5',price:85};
var products = [shampoo, soap, coffee, chips, chocolate];
var shoppingModule = angular.module('shopping', []);

shoppingModule.controller('ShoppingController', ["$scope", function ($scope) {
    $scope.products = angular.copy(products);
    $scope.cartItems = [];
    $scope.addToCart = function (id) {
        for (var index = 0; index < $scope.products.length; index++) {
            if (products[index].id == id) {
                $scope.cartItems.push(products[index]);
            }
        }
    }
}]);