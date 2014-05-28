var redis = require("redis"),
    client = redis.createClient();

module.exports = {
    save: function (args) {
        client.zadd(args, function (err, response){
            if (err) throw err;
            console.log('added '+response+' items');
        });
    }
};
