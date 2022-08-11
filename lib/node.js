/**
 * 
 */
class Node{


    constructor( name , target ){

        this.name = name;
        this.target = target;
        this.network = [];
        this.timeStamp = (new Date()).getTime();
    }

    open( target ){
        //seend this node address and data to the target
        //receive the network list
        //notify all network partners
    }

    close(){
        this.network.forEach( function( url ){
            //send disconnect message
        });
    }

    share(){
        this.network.forEach( function( url ){
            //send network list to share
        });
    }

}


module.exports = { Node };