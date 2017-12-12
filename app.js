new Vue({
    el:'#app',
    data: {
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[]
    },
    methods:{
        startGame(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth =100;
            this.turns = [];
        },
        attack(){
            let damage = this.calculateDamage(3,10)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isplayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if(this.checkWin()){
                return;
            }

            this.monsterAttacks();
        },
        specialAttack(){
            let damage = this.calculateDamage(5,12);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isplayer: true,
                text: 'Player hits Monster hard for ' + damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        heal(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isplayer: true,
                text: 'Player heals for 10'
            });
            // this.monsterAttacks();
        },
        giveUp(){
            this.gameIsRunning = false;
            this.turns = [];
        },
        monsterAttacks(){
            let damage = this.calculateDamage(10,20);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isplayer: false,
                text: 'Monster hits player for ' + damage
            });

        },
        calculateDamage(max,min){
            return Math.max(Math.floor(Math.random() * max ) + 1,min)
        },
        checkWin(){
            if(this.monsterHealth <= 0){
                if(confirm('You won! New game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            } else if(this.playerHealth <=0){
                if(confirm('You lost! New game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});