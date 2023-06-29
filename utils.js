import crypto from "crypto";
import axios from "axios";



function isValidRequest(payload, ldSignature, secret) {
  const dataStr = JSON.stringify(payload);

  var hash = crypto
    .createHmac("sha256", secret)
    .update(dataStr)
    .digest("hex");
  const isValid = hash === ldSignature;
  if (!isValid) {
    console.log(`ldSignature=\t${ldSignature}`);
    console.log(`hash       =\t${hash}`);
  }

  return isValid;
}

function isReviewApprovalRequest(payload) {

  if (!payload.accesses || payload.accesses.length == 0) {
    return false;
  }

  return payload.accesses[0].action == "reviewApprovalRequest";

}


function isRequestApproved(payload) {

  if (!payload.currentVersion || !payload.currentVersion.reviewStatus) {
    return false;
  }

  return payload.currentVersion.reviewStatus.toLowerCase() === "approved";

}


function isChangePending(payload) {

  if (!payload.currentVersion || !payload.currentVersion.status) {
    return false;
  }

  return payload.currentVersion.status.toLowerCase() === "pending";

}


async function applyApprovalRequest(payload, accessToken) {
  if (!payload.currentVersion || !payload.currentVersion._id) {
    return false;
  }
  const { currentVersion } = payload;
  const { _id: id, requestorId, resource } = currentVersion;

  const url = `https://app.launchdarkly.com/api/v2/approval-requests/${id}/apply`;
  const comment = { comment: 'Automated Applied: Looks good, thanks for updating' };
  const headers = {
    headers: {
      'Authorization': accessToken,
      'Content-Type': 'application/json',
    }
  };

  console.log(`Applying changes:\nRequest id [${id}]`);
  console.log(`Requested by [${requestorId}]`);
  console.log(`Resource:\n${JSON.stringify(resource, null, 4)}`)
  console.log(`Using endpoint url=[${url}]`);
  console.log();

  return axios.post(url, comment, headers);

} //eof



export default { isValidRequest, isReviewApprovalRequest, isRequestApproved, isChangePending, applyApprovalRequest }