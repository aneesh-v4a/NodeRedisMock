const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

exports.handler = async (event) => {
  client.on("error", (err) => {
    if (err) {
      console.log("here");
    }
    console.log(err);
  });
  return "hello";
};
