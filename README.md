# Carbon-Aware Cloud Workload Routing ☁️🌱

A framework for intelligent cloud workload placement designed to minimize carbon emissions by routing compute tasks based on real-time **regional grid carbon intensity**, **network latency (RTT)**, and **server resource utilization**.

[![AWS](https://img.shields.io/badge/AWS-Cloud%20Services-orange.svg)](https://aws.amazon.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg)](https://nodejs.org/)
[![Sustainability](https://img.shields.io/badge/Green%20Computing-Carbon--Aware-brightgreen.svg)](https://greensoftware.foundation/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Problem & Motivation

Modern hyperscale cloud data centers consume enormous amounts of electrical power. However, grid carbon intensity varies dramatically across geographic regions and throughout the day depending on local renewable energy availability (solar, wind, hydro).

This project implements a multi-region routing framework that dynamically evaluates:
1. **Carbon Footprint:** Real-time regional grid emission intensity ($gCO_2/kWh$).
2. **Quality of Service (QoS):** End-to-end network latency and round-trip time (RTT).
3. **Infrastructure Health:** EC2 utilization metrics gathered via AWS CloudWatch.

---

## 🏗️ High-Level Architecture

```
                 Incoming Compute Workload
                            │
                            ▼
              ┌───────────────────────────┐
              │  Carbon-Aware Router API  │
              └─────────────┬─────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│Carbon Service│    │ RTT Service  │    │  CloudWatch  │
│  (Emissions) │    │  (Latency)   │    │(Utilization) │
└───────┬──────┘    └───────┬──────┘    └───────┬──────┘
        └───────────────────┼───────────────────┘
                            ▼
               Multi-Objective Decision Engine
           (Score = w1·Carbon + w2·RTT + w3·Load)
                            │
                            ▼
        Deploy / Route to Optimal AWS Region
    (e.g., eu-north-1, us-west-2, ap-south-1)
```

---

## ✨ Core Features

- 🌍 **Multi-Region Awareness:** Evaluates multiple AWS regions concurrently to identify green compute windows.
- ⚡ **Real-Time Latency Monitoring:** Tracks round-trip times (RTT) to guarantee SLA and QoS requirements are satisfied.
- 📊 **CloudWatch Integration:** Ingests live hardware metrics (CPU utilization, memory pressure, active instances) via AWS CloudWatch.
- 🎯 **Weighted Scoring Model:** Flexible scoring balancing carbon efficiency against execution speed.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js, Express.js
- **Cloud Infrastructure:** AWS EC2, AWS CloudWatch, AWS SDK
- **Metrics & APIs:** Grid Carbon Intensity APIs, ICMP/TCP Ping RTT measurement
- **Testing:** Custom automated multi-region test runner

---

## 📂 Project Structure

```
├── config/
│   └── regions.js            # AWS region profiles & coordinates
├── services/
│   ├── carbonService.js      # Carbon intensity scoring & data ingestion
│   ├── cloudwatchService.js  # AWS CloudWatch metric fetcher
│   └── rttService.js         # Round-trip latency evaluator
├── test/
│   ├── carbon-test.js        # Carbon emission service tests
│   ├── cloudwatch-test.js    # Metric polling tests
│   └── test-all-regions.js   # Multi-region benchmark suite
├── ec2-details.js            # Instance type configuration & specifications
└── server.js                 # Routing service entry point
```

---

## ⚙️ Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rashmipandey870/aws-carbon-routing.git
   cd aws-carbon-routing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure AWS Credentials:**
   Set standard AWS credentials for CloudWatch metric access:
   ```bash
   export AWS_REGION=ap-south-1
   export AWS_ACCESS_KEY_ID=your_access_key
   export AWS_SECRET_ACCESS_KEY=your_secret_key
   ```

4. **Run tests across regions:**
   ```bash
   node test/test-all-regions.js
   ```

5. **Start routing server:**
   ```bash
   node server.js
   ```

---

## 🔬 Research Context
This implementation builds upon research in sustainable computing and carbon-aware distributed systems conducted during summer research work at **NIAMT**.

---

## 👩‍💻 Author
**Rashmi Pandey**  
- [GitHub](https://github.com/rashmipandey870)  
- [LinkedIn](https://www.linkedin.com/in/rashmipandey870)
