const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

const allowList = ["https://grafana.local.dev-gutools.co.uk"];

const corsOptions = {
  origin: allowList,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const getFakeData = (metric, numberOfDataPoints, range) => {
  const data = [];
  const timeNow = new Date().getTime();
  const oneHourInMilliseconds = 1000 * 60 * 60;
  for (let i = 0; i < numberOfDataPoints; i++) {
    data.push([Math.floor(Math.random() * range), timeNow - i * oneHourInMilliseconds]);
  }
  return { target: metric, datapoints: data };
};

app.get("/", (_, res) => {
  res.send("ok");
});

app.post("/search", (_, res) => {
  res.json(["uniqueUsers", "claimedMessges", "unclaimedMessages"]);
});

app.post("/query", (req, res) => {
  const { targets } = req.body;
  const response = [];
  targets?.forEach((target) => {
    const { target: metric, data } = target;
    console.log('data', data);
    response.push(getFakeData(metric, 30, 1000));
  });
  res.json(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
