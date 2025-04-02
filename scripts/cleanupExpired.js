// scripts/cleanupExpired.js
const AWS = require("aws-sdk");
require("dotenv").config();

const dynamo = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMO_ENDPOINT,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE = process.env.DYNAMO_TABLE;

async function cleanupExpired() {
  const now = Math.floor(Date.now() / 1000);

  const result = await dynamo.scan({
    TableName: TABLE
  }).promise();

  for (const item of result.Items) {
    if (item.expiresAt <= now) {
      console.log(`Deleting expired item: ${item.shortId}`);
      await dynamo.delete({
        TableName: TABLE,
        Key: { shortId: item.shortId }
      }).promise();
    }
  }
}

cleanupExpired();
