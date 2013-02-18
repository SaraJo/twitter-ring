
var express = require('express')
, twitter = require('ntwitter')
, j5 = require("johnny-five")



var twit = new twitter({
   consumer_key: 'oXAbKQyQ47h9CBVXmMGdQ',
   consumer_secret: 'z9EqbFpf4dhNuY6M1Eawk3W2dwnt9B1PoQRAMyWtxTU',
   access_token_key: '15524875-L916RzSGVMqi1DlZz4MiB7RCgsWhuKSsD9T7Pn5i1',
   access_token_secret: 'GLMDBi2NFYl3eZmUZ4zmhphDMozXesMN16DI9NOaIo'
});



var app = express()
    , tweet
    , board = new j5.Board();

app.listen(3000);
board.on("ready", function() {
setInterval(
function(){
  twit.getUserTimeline( { screen_name : "sarajchipps" , count : 1 } ,
        function (err, data) {
          red = new j5.Led(11);
          green = new j5.Led(9);
          blue = new j5.Led(10);

          var leds = new j5.Leds();
          tweet = data[0].text;

          if(tweet.indexOf('hate') != -1){
            console.log("hate!");
            red.off();
            green.on();
            blue.on();
            }
          else if(tweet.indexOf('happy') != -1){
            console.log("happy");
            red.on();
            green.on();
            blue.off();
            }       
          else{   
            console.log('nothing!');
            red.on();
            green.off();
            blue.on();
            }
        } 
  )}, 5000);
}); 


/*twit.stream('statuses/sarajchipps', function(stream) {
    stream.on('data', function (data) {
          console.log(data);
            });
}); */
