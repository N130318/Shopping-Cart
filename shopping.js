/**
 * Created by namita on 1/1/15.
 */
var shampoo = {name: 'Sunsilk', id: '1', price: 599 };
var soap = {name: 'Lux', id: '2', price: 55 };
var coffee = {name: 'Nestle', id: '3', price: 100};
var chips = {name: 'Uncle Chips', id: '4', price: 60};
var chocolate = {name: 'Dairy Milk', id: '5', price: 85};
var products = [shampoo, soap, coffee, chips, chocolate];

var shoppingModule = angular.module('shopping', []);

shoppingModule.controller('ShoppingController', ["$scope", function ($scope) {
    $scope.products = angular.copy(products);
    $scope.cartItems = [];
    $scope.addToCart = function (id) {
        for (var index = 0; index < $scope.products.length; index++) {
            if (products[index].id == id) {
                var productCopy = angular.copy(products[index]);
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
    }
    $scope.decreaseQuantity = function (id) {
        for (var j = 0; j < $scope.cartItems.length; j++) {
            if ($scope.cartItems[j].id == id) {
                $scope.cartItems[j].quantity = $scope.cartItems[j].quantity - 1;
                if ($scope.cartItems[j].quantity < 1) {
                    $scope.cartItems.splice(j, 1);
                }
            }
        }
    }
    $scope.increaseQuantity = function (id) {
        for (var j = 0; j < $scope.cartItems.length; j++) {
            if ($scope.cartItems[j].id == id) {
                $scope.cartItems[j].quantity++;
                if ($scope.cartItems[j].quantity > 10) {
                    $scope.cartItems[j].quantity = 10;
                }
            }
        }
    }
    $scope.updateQuantity = function(id,watchChange){
        if(watchChange==true){
            $scope.increaseQuantity(id);
        }
        else{
            $scope.decreaseQuantity(id);
        }
    }
}]);