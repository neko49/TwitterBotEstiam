var Twit = require('twit');
var config = require('./config.js');
var params = require('./params.js')
var Twitter = new Twit(config);



//track le hashtag
const stream = Twitter.stream('statuses/filter', params);

function reponseCallBack(err, data, response) {
    console.log(err)
}

stream.on ('tweet', tweet =>{
    //Like the hashtag
    Twitter.post('favorites/create', {id: tweet.id_str }, reponseCallBack);

    //Retweet every post with hashtag
    Twitter.post('statuses/retweet/:id', {id: tweet.id_str }, reponseCallBack);

    //Following users mentioning the hashtag with more than 100 followers
    if(tweet.user.followers_count > 100){
        Twitter.post('friendships/create', {user_id: tweet.user.id_str}, function(err, data, response) {
            console.log(`Followed @${tweet.user.screen_name}`)});
    }
})



  