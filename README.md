# 🔗 URL Shortener MVP (Local Version)

A lightweight, secure, and customizable URL shortening service built using **Node.js**, **Express**, and **DynamoDB Local**.

This project includes a demo web UI, time-based URL expiry (TTL), usage analytics, and is serverless-ready for future deployment on AWS Lambda and API Gateway.


## 🚀 Features

- 🔐 **Secure short ID generation** using Base62 and Node's `crypto` module
- 🌐 **URL normalization** and validation to prevent duplication and ensure consistency
- ⏳ **Automatic URL expiry** after 60 minutes via DynamoDB TTL
- 📊 **Click analytics** endpoint to track usage statistics
- 🧪 **Test suite** with Jest for reliable and repeatable testing
- 🖥️ **Web UI** for local demo and interaction
- ☁️ **Serverless-ready** architecture (AWS Lambda compatible)


## 🧰 Tech Stack

- **Node.js**
- **Express** (local server only)
- **AWS SDK v3** for JavaScript
- **DynamoDB Local** (for development/testing)
- **TTL support** using DynamoDB item expiration
- **Base62 encoding** (`base-x`)
- **UUID**, **crypto**
- **Jest** for testing


## 🛠️ Getting Started

### 📦 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener-mvp.git
cd url-shortener-mvp

### ✅ Step 2: Install Dependencies

```bash
npm install
```


### ✅ Step 3: Configure Environment

Create a `.env` file in the root:

```env
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
DYNAMO_TABLE=short_urls
DYNAMO_ENDPOINT=http://localhost:8000
PORT=3000
```


### ✅ Step 4: Run DynamoDB Locally (JAR Method)

1. Download the JAR and native libraries from the official AWS site:  
   👉 https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html

2. Extract and run DynamoDB:

```bash
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 8000
```

This will run DynamoDB on `http://localhost:8000`.

---

### ✅ Step 5: Create the DynamoDB Table

```bash
aws configure
# Use dummy values:
# AWS Access Key ID: test
# AWS Secret Access Key: test
# Default region: us-west-2

aws dynamodb create-table \
  --table-name short_urls \
  --attribute-definitions AttributeName=shortId,AttributeType=S \
  --key-schema AttributeName=shortId,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --endpoint-url http://localhost:8000 \
  --region us-west-2
```

### ✅ Step 6: Run the Application

```bash
node app.js
```

The server will start on:
```
http://localhost:3000/
```

### ✅ Step 7: Access the Web UI

Open your browser and go to:
```
http://localhost:3000/
```

Use it to:
- Paste a long URL
- Generate a short link
- Test redirection
- View analytics


### ✅ Step 8: Run Tests (Optional)

```bash
npm test
```


## 📌 Project Structure

```
url-shortener-mvp/
├── app.js                # Express server
├── public/               # Static web UI
├── routes/               # Shorten, redirect, analytics
├── services/             # DynamoDB abstraction
├── utils/                # URL normalization
├── __tests__/            # Unit tests
├── .env                  # Environment config
├── package.json
└── README.md
```


## ✅ You’re Ready!

This fully local app supports:
- URL shortening with TTL
- Custom redirect + analytics
- Web UI for demo
- Test suite for validation


## 🧭 Next Step: Deploy to AWS

This app is ready to be deployed to:
- AWS Lambda
- API Gateway
- DynamoDB (cloud)

A full `serverless.yml` config is coming in the next phase of the project.


## 🙌 Credits

Made with ❤️ by Aniket  
Built for learning, demos, and real-world scaling ✨
```
