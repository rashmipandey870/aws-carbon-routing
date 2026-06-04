require("dotenv").config();

const {
  EC2Client,
  DescribeInstancesCommand
} = require("@aws-sdk/client-ec2");

const client = new EC2Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function main() {
  const result = await client.send(
    new DescribeInstancesCommand({})
  );

  console.log(
    JSON.stringify(result, null, 2)
  );
}

main();