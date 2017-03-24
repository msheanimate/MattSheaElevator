/// <reference path="../typings/tsd.d.ts" />

module myMod {
    class InputController {
        total: number;
        private input : string;
        private timer;
        private users;
        private starters;
        private clicked;
        private usersTwo;
        private startersTwo;
        private clickedTwo;
        static $inject = ['$log']
        constructor(private $log : angular.ILogService){
            this.input="10:8-3;4-6;5-9;5-8"
            this.clicked=false
        }

        modeOne(){
            this.users = [];
            this.users = this.setOrder(this.input); 
            this.starters = this.users[0];
            this.clicked = true;
            this.users.shift();
            
        }


        modeTwo(){
            this.usersTwo = [];
            this.usersTwo = this.setOrder(this.input);
            this.startersTwo = this.usersTwo[0];
            this.usersTwo.shift();
            this.$log.info(this.usersTwo);


        }

        

        setOrder(input){
            //this.$log.info(input)
            var chars = input.split('');
            var result = input.split(':')
            var start = [result[0],0,0,0];
            var floors = result[1];
            var collection = floors.split(';');
            var traveled = result[0];
            var check = 0
            var total = 0;
            var items = [];
            var arr = [];
            for (var i of collection) {
                var dash = i.split('-')
                traveled = Math.abs(traveled - dash[0]) + check ;
                check =  Math.abs(dash[0] - dash[1]) + traveled;
                dash.push(traveled);
                dash.push(check);
                traveled = dash[1];
                items.push(dash);
            }
            items.unshift(start);

            items.forEach(([pick, drop, total, check], index) => 
                 arr.push({'pickUp':pick, 'dropOff':drop, 'person':index , 'total': total, 'check': check}) 
            );
            items.forEach(([pick, drop, total, check], index) => 
                setTimeout(() => 
                    index === 0 ? this.$log.info( "asdf " + pick  + "asdf ") :
                        this.$log.info( "Move to floor  " + pick  + "(Pick up Passenger " + index + ") (" + parseInt(total) + ')\n'+ 
                                        "Move to floor  " + drop + "(Drop off Passenger " + index + ") (" + parseInt(check)+ ") "), 
                1000 * index));
            return arr;
        }
    }
    var myApp = angular.module('myApp', []);
    myApp.controller('InputController', InputController);
}