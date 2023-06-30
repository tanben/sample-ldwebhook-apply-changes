import express from "express";
import bodyParser from "body-parser";
import ldUtils from "./utils.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.post("/webhook", async (req, res) => {
  const payload = req.body;
  const signature = req.headers["x-ld-signature"];

  if (!ldUtils.isValidRequest(payload, signature, process.env.webhook_secret)) {
    res.status(401).send("Invalid authorization header").end(); // Responding is important
    return false;
  }

  // console.log(`isReviewApprovalRequest(payload)=${ldUtils.isReviewApprovalRequest(payload)}`)
  // console.log(`isRequestApproved(payload)=${ldUtils.isRequestApproved(payload)}`)
  // console.log(`isChangePending(payload)=${ldUtils.isChangePending(payload)}`)

  if (
    !ldUtils.isReviewApprovalRequest(payload) ||
    !ldUtils.isRequestApproved(payload) ||
    !ldUtils.isChangePending(payload)
  ) {
    res.status(400).send("No Pending Approval").end();
    return false;
  }

  // service_kind, this value is sent by LD webhook, send a sample webhook event from LD to capture this value
  // you can enable this block for addiontal validation
  //
  // if (!payload.currentVersion || payload.currentVersion.serviceKind !== process.env.service_kind) {
  //   console.log('invalid request')
  //   res.status(400).send('Invalid request').end()
  //   return false;
  // }
  // console.log(payload)

  const response = await ldUtils
    .applyApprovalRequest(payload, process.env.access_token)
    .then((response) => {
      const { data } = response;
      const dateTmp = new Date(data.appliedDate);
      const dateOpt = {
        dateStyle: "short",
        timeStyle: "medium",
        timeZone: "America/New_York",
      };
      const appliedDate = new Intl.DateTimeFormat("en-US", dateOpt).format(
        dateTmp
      );
      console.log(
        `Update status=[${data.status}] appliedDate=[${appliedDate}]`
      );
    })
    .catch((err) => {
      console.log(err.message);
      res.status(err.response.status).end(err.data);
      return false;
    });

  console.log("done");
  res.status(200).end();
  return true;
});
