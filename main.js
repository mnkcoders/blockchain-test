const Chain = require( './lib/chain' );

const HTTP = require('http');

const Server = {
    'host': 'localhost',
    'port': 8000,
};

const requestListener = function( request , response ){
    response.writeHead( 200 );
    response.end('My first Server!');
    //console.log( response );
    //console.log( request );
};

const server = HTTP.createServer(requestListener);

server.listen( Server.port , Server.host , () => {
    console.log(`\nServer is running on http://${Server.host}:${Server.port}\n`);
});


