import {Block} from 'block';


/**
 * 
 */
 export class Chain{
    constructor(){
        this.chain = [this.createGenesis()];
        this.accounts = [];
        this.dateStarted = this.timeStamp();
    }
    /**
     * @returns Number
     */
    timeStamp(){
        return (new Date()).getTime();
    }
    /**
     * @returns Block
     */
    createGenesis( ){
        return new Block( 1 , null , this.timeStamp() , 'GENESIS' , '' );
    }
    /**
     * @returns Block
     */
    last(){
        return this.chain[ this.chain.length - 1 ];
    }
    /**
     * @param {Object} data 
     * @param {Account} owner
     * @returns Chain
     */
    addBlock( data , owner ){
        if( owner instanceof Account ){
            var block = new Block( this.chain.length , owner , this.timeStamp() , data , this.last().hash );
            this.chain.push( block );    
        }
        return this;
    }
    /**
     * @param {Account} owner 
     * @param {String} title 
     * @returns Chain
     */
    addAsset( owner , title , value ){
        var ts = this.timeStamp();
        var assetData = {
            'token': HASH( ts + title ),
            'timeStamp': ts,
            'title': title,
            'value': value | 0 ,
        };
        return this.addBlock( assetData, owner );
    }
    /**
     * @param {Account} owner 
     * @returns Number
     */
    balance( owner ){
        var amount = 0;
        if( owner instanceof Account && owner.id > 0 ){
            for( var i = 0 ; i < this.chain.length ; i++ ){
                if( this.chain[i].owner === owner.id ){
                    var data = this.chain[i].data;
                    amount += data.hasOwnProperty('amount') ? data.amount : 0;
                }
            }
        }
        return amount;
    }
    assets( owner ){
        var list = [];
        if( owner instanceof Account && owner.id > 0 ){
            for( var i = 0 ; i < this.chain.length ; i++ ){
                if( this.chain[i].owner === owner.id ){
                    var data = this.chain[i].data;
                    if( data.hasOwnProperty('token') ){
                        data.timeStamp = this.chain[i].timeStamp;
                        list.push( data );
                    }
                }
            }
        }
        return list;
    }
    addCredit( amount , owner ){
        if( owner instanceof Account ){
            console.log('-->Adding '+ amount +' CuteCoins to Account ' + owner.id );
            return this.addBlock( {'amount':amount} , owner );
        }
        return this;
    }
    /**
     * 
     * @param {Number} amount 
     * @param {Account} sender 
     * @param {Account} receiver 
     * @returns 
     */
    transferCredit( amount , sender , receiver ){
        if( sender instanceof Account && receiver instanceof Account ){
            var balance = this.balance( sender );
            console.log('-->Transfering ' + amount + ' CuteCoins from Sender ' + sender.id + ' to Receiver ' + receiver.id );
            if( balance >= amount ){
                this.addBlock( {'amount':amount} , receiver ).addBlock({'amount':-amount} , sender);
                console.log('--> OK !!');
            }
            else{
                //report non sufficcient amount
                console.log('-->Not enough founds for account ' + sender.id + ' !!');
            }
        }
        return this;
    }
    /**
     * @param {String} fingerPrint 
     * @returns Chain
     */
    addAccount( fingerPrint ){
        var account = new Account( this.accounts.length + 1 , fingerPrint , this );
        this.accounts.push( account );
        console.log('-->Adding Account ' + account.id );
        return this;
    }
    /**
     * @param {Number} index 
     * @returns Account|null
     */
    findAccount( index ){
        return index > 0 && index <= this.accounts.length ? this.accounts[index-1] : null;
    }

    validate(){
        if( this.chain.length > 1 ){
            for( var i = 1 ; i < this.chain.length ; i++ ){
                const currentBlock = this.chain[i];
                const previousBlock = this.chain[i-1];
                if( currentBlock.hash !== currentBlock.createHash() ){
                    return false;
                }
                if( currentBlock.previous !== previousBlock.hash ){
                    return false;
                }
            }    
        }
        return true;
    }
    /**
     * @returns String
     */
    list(){
        return JSON.stringify( this.chain , null , 4);
    }

    listAccounts(){
        return this.accounts.map( function( account ){
            return account;
        });
    }
}
