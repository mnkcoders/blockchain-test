import {HASH} from 'hash';

/**
 * 
 */
export class Block{
    /**
     * @param {Number} index 
     * @param {Account} account 
     * @param {Number} timeStamp 
     * @param {Object} data 
     * @param {String} previous 
     */
    constructor( index , account, timeStamp , data , previous = '' ){
        this.id = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.type = Block.Type.Wallet;
        this.previous = previous;
        this.hash = this.createHash();
        this.owner = account instanceof Account ? account.id : 0;
    }
    /**
     * @returns String
     */
    createHash(){
        return HASH( this.index + this.previous +  this.timeStamp + JSON.stringify( this.data ) );
    }
    /**
     * @returns Date
     */
    date(){
        return new Date(this.timeStamp);
    }
}
Block.Type = {
    'Account':1,
    'Wallet':2,
    'Token':3
};