var twitter = TwitterWebService.getInstance(
  PropertiesService.getScriptProperties().getProperty('CONSUMER_KEY'),      // Twitter App's Consumer Key
  PropertiesService.getScriptProperties().getProperty('CONSUMER_SECRET')    // Twitter App's Consumer Secret
);
token = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN'); // Your Slack Workspace's Token

// Authorize
function authorize() {
  twitter.authorize();
}

// Deauthorize
function reset() {
  twitter.reset();
}

// Callback
function authCallback(request) {
  return twitter.authCallback(request);
}

// Post tweet
function postUpdateStatus(message) {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/update.json', {
    method: 'post',
    payload: { status: message }
  });
}

// Get message from Slack
function doPost(e){
  var message = e.parameter.text;
  postUpdateStatus(message);
  slackApp = SlackApp.create(token);
  slackApp.chatDelete(e.parameter.channel_id, e.parameter.timestamp);
}
