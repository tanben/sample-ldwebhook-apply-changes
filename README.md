# Apply approval using LaunchDarkly Webhook integration
This is an example of using LaunchDarkly webhook integration to apply approved flag changes
## Requirement
- [LaunchDarkly account](https://launchdarkly.com/start-trial/)
- [LD Webhook integration](https://docs.launchdarkly.com/home/connecting/webhooks)
- [LD Access token](https://docs.launchdarkly.com/home/account-security/api-access-tokens)
- NodeJS >=16.8.x
  
## Setup
1. Setup the LD webhook integration, details [here](https://docs.launchdarkly.com/home/connecting/webhooks)
2. create the following environment secrets
   - webhook_secret, key used to sign the webhook payload
   - access_token, REST API with apply approval request permission
   
   

