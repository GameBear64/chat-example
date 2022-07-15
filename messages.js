function formatMessage(username, text) {
    return {
      username,
      text,
      time: new Date().getHours() + ":" + new Date().getMinutes()
    };
}
  
module.exports = formatMessage;