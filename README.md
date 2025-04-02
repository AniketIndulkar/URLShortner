### DynamoDB Local Setup
1. Download from: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html
2. Unzip and place the contents in a folder named `dynamodb_local_jar/`.
3. To run:
   ```bash
   java -Djava.library.path=./dynamodb_local_jar/DynamoDBLocal_lib -jar ./dynamodb_local_jar/DynamoDBLocal.jar -sharedDb
