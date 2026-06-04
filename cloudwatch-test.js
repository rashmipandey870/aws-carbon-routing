require("dotenv").config();

const {
  CloudWatchClient,
  GetMetricStatisticsCommand,
} = require("@aws-sdk/client-cloudwatch");

const client = new CloudWatchClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function getCPU() {
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - 60 * 60 * 1000);

  const command = new GetMetricStatisticsCommand({
    Namespace: "AWS/EC2",
    MetricName: "CPUUtilization",

    StartTime: startTime,
    EndTime: endTime,

    Period: 300,
    Statistics: ["Average"],
  });

  try {
    const data = await client.send(command);

    console.log("CPU Metrics:");
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
}

getCPU();