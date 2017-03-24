/// <reference path="../typings/tsd.d.ts" />
var myMod;
(function (myMod) {
    var InputController = (function () {
        function InputController($log) {
            this.$log = $log;
            this.input = "10:8-3;4-6;5-9;5-8";
            this.clicked = false;
        }
        InputController.prototype.modeOne = function () {
            this.users = [];
            this.users = this.setOrder(this.input);
            this.starters = this.users[0];
            this.clicked = true;
            this.users.shift();
        };
        InputController.prototype.modeTwo = function () {
            this.usersTwo = [];
            this.usersTwo = this.setOrder(this.input);
            this.startersTwo = this.usersTwo[0];
            this.usersTwo.shift();
            this.$log.info(this.usersTwo);
        };
        InputController.prototype.setOrder = function (input) {
            var _this = this;
            //this.$log.info(input)
            var chars = input.split('');
            var result = input.split(':');
            var start = [result[0], 0, 0, 0];
            var floors = result[1];
            var collection = floors.split(';');
            var traveled = result[0];
            var check = 0;
            var total = 0;
            var items = [];
            var arr = [];
            for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
                var i = collection_1[_i];
                var dash = i.split('-');
                traveled = Math.abs(traveled - dash[0]) + check;
                check = Math.abs(dash[0] - dash[1]) + traveled;
                dash.push(traveled);
                dash.push(check);
                traveled = dash[1];
                items.push(dash);
            }
            items.unshift(start);
            items.forEach(function (_a, index) {
                var pick = _a[0], drop = _a[1], total = _a[2], check = _a[3];
                return arr.push({ 'pickUp': pick, 'dropOff': drop, 'person': index, 'total': total, 'check': check });
            });
            items.forEach(function (_a, index) {
                var pick = _a[0], drop = _a[1], total = _a[2], check = _a[3];
                return setTimeout(function () {
                    return index === 0 ? _this.$log.info("asdf " + pick + "asdf ") :
                        _this.$log.info("Move to floor  " + pick + "(Pick up Passenger " + index + ") (" + parseInt(total) + ')\n' +
                            "Move to floor  " + drop + "(Drop off Passenger " + index + ") (" + parseInt(check) + ") ");
                }, 1000 * index);
            });
            return arr;
        };
        return InputController;
    }());
    InputController.$inject = ['$log'];
    var myApp = angular.module('myApp', []);
    myApp.controller('InputController', InputController);
})(myMod || (myMod = {}));
