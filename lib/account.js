//import {Block} from 'block';

/**
 * 
 */
 export class Account{
    /**
     * 
     * @param {Number} index 
     * @param {String} fingerPrint 
     * @param {Chain} wallet 
     */
    constructor( index , fingerPrint , wallet ){
        this.id = index;
        this.fingerPrint = fingerPrint;
        this.timeStamp = (new Date()).getTime();
        this.hash = this.createHash();

        this.wallet = wallet || null;
    }
    balance(){
        return this.wallet.balance( this );
    }
    assets(){
        return this.wallet.assets( this ).map( function( asset ){
            return {
                'title': asset.title,
                'token': asset.token,
                'date': new Date(asset.timeStamp),
                'value': asset.value
            };
        });;
    }
    date(){
        return new Date(this.timeStamp);
    }
    /**
     * @returns Object
     */
    profile(){
        return {
            'index': this.id,
            'timeStamp': this.timeStamp,
            'balance': this.balance(),
            'assets': this.assets()
        };
    }
    /**
     * @returns String
     */
     createHash(){
        return HASH( this.index + this.timeStamp + this.fingerPrint );
    }
}