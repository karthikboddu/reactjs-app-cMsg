const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io')
//const socketRedis = require('socket.io-redis')
const moniker = require('moniker')
const REDIS_URL = process.env.REDIS_URL;

// A Node.js server
var server = http.Server();
// Requiring the ioredis package
var Redis = require('ioredis');
// A redis client
var redis = new Redis();
var io = socketIO(server);

// Store people in chatroom
var chatters = [];

// Store messages in chatroom
var chat_messages = [];

// Subscribe to all channels which name complies with the '*' pattern
// '*' means we'll subscribe to ALL possible channels
redis.psubscribe('*');

// Listen for new messages
redis.on('pmessage', function (pattern, channel, message) {
    message = JSON.parse(message);
	io.emit(""+message.data.data.user_id+message.data.data.receiver_id, message.data);
    // Just to check that things really work
    if(channel == "laravel_database_userjoined App\Events\MessageSent"){
    	io.emit('user-joined',message );
    }
    
	const mdata = message.data;
    console.log(channel, message.event,message.data,pattern);
});



const app = express();
const publicPath = path.join(__dirname+ '/build');

const port = process.env.PORT || 3001;
app.use(express.static(publicPath));app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, () => {
   console.log('Server is up!');
}); 