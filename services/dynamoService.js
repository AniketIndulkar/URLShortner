const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMO_ENDPOINT, // Important for local
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE = process.env.DYNAMO_TABLE;

module.exports = {
  insertShortUrl: async (item) => {
    const params = {
      TableName: TABLE,
      Item: item,
      ConditionExpression: 'attribute_not_exists(shortId)' // Prevent overwrite
    };
    return dynamo.put(params).promise();
  },

  getShortUrl: async (shortId) => {
    const params = {
      TableName: TABLE,
      Key: { shortId }
    };
    const result = await dynamo.get(params).promise();
    return result.Item;
  }
};

module.exports.updateShortUrlStats = async (shortId) => {
    const params = {
      TableName: TABLE,
      Key: { shortId },
      UpdateExpression: "SET hitCount = if_not_exists(hitCount, :zero) + :incr, lastAccessed = :now",
      ExpressionAttributeValues: {
        ":incr": 1,
        ":now": Date.now(),
        ":zero": 0
      }
    };
  
    return dynamo.update(params).promise();
  };
  
