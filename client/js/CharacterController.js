define(['Player'], function(Player) {


    function CharacterController( _player) {
        this.tickIntervalId = null;
    }

    CharacterController.prototype.startTicking = function(interval) {
        if (this.tickIntervalId === null) {
            this.tickIntervalId = setInterval(
                    (function(self) {
                        return function() {
                            self.tick();
                        }
                    })(this),
                    interval
                    );
        }
    };

    /*
     * code executed on each tick
     */
    CharacterController.prototype.tick = function() {
        this.changePosition();
    };


    CharacterController.prototype.stopTicking = function() {
        clearInterval(this.tickIntervalId);
        this.tickIntervalId = null;
    };

    CharacterController.prototype.getPlayer = function() {
        return this.player;
    };

    CharacterController.prototype.setPlayer = function(_player) {
        this.player = _player;
    };


    /*
     * changes position of local character depending on its activity, direction and speed
     * this function is called on each tick
     */
    CharacterController.prototype.changePosition = function() {
        if (this.player.getActivity() === Player.activity.WALK) {
            var updateInfo = {};
            switch (this.player.getDirection()) {
                case Player.direction.UP:
                    updateInfo.posY = this.player.getPosY() - this.player.getWalkSpeed();
                    break;
                case Player.direction.UPLEFT:
                    updateInfo.posY = this.player.getPosY() - this.player.getWalkSpeed();
                    updateInfo.posX = this.player.getPosX() - this.player.getWalkSpeed();
                    break;
                case Player.direction.LEFT:
                    updateInfo.posX = this.player.getPosX() - this.player.getWalkSpeed();
                    break;
                case Player.direction.DOWNLEFT:
                    updateInfo.posX = this.player.getPosX() - this.player.getWalkSpeed();
                    updateInfo.posY = this.player.getPosY() + this.player.getWalkSpeed();
                    break;
                case Player.direction.DOWN:
                    updateInfo.posY = this.player.getPosY() + this.player.getWalkSpeed();
                    break;
                case Player.direction.DOWNRIGHT:
                    updateInfo.posY = this.player.getPosY() + this.player.getWalkSpeed();
                    updateInfo.posX = this.player.getPosX() + this.player.getWalkSpeed();
                    break;
                case Player.direction.RIGHT:
                    updateInfo.posX = this.player.getPosX() + this.player.getWalkSpeed();
                    break;
                case Player.direction.UPRIGHT:
                    updateInfo.posX = this.player.getPosX() + this.player.getWalkSpeed();
                    updateInfo.posY = this.player.getPosY() - this.player.getWalkSpeed();
                    break;
            }
            
            if( updateInfo.posX < 0){
                updateInfo.posX = 0;
            }else if( updateInfo.posX > 700 - 150){
                updateInfo.posX = 700 - 150;
            }
            this.player.update(updateInfo);
        }
    };
    
    
    return CharacterController;
});