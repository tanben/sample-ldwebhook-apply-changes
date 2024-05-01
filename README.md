# LaunchDarkly Webhook Approval Application

This is an Express.js application that listens for webhook events from LaunchDarkly and automatically apply approved changes.

## Features

- Listens for webhook events from LaunchDarkly
- Validates the incoming request using the `x-ld-signature` header and the configured `webhook_secret`
- Checks if the webhook event is a review approval request, if the request is approved, and if there is a pending change
- Applies the approval request using the LaunchDarkly API and the provided `access_token`
- Logs the update status and the applied date of the change

## Prerequisites
- [LaunchDarkly account](https://launchdarkly.com/start-trial/)
- [LD Webhook integration](https://docs.launchdarkly.com/home/connecting/webhooks)
- [LD Access token](https://docs.launchdarkly.com/home/account-security/api-access-tokens)
- NodeJS >=16.8.x

## Installation

1. Clone the repository:

```bash
git clone git@github.com:tanben/sample-ldwebhook-apply-changes.git
```

2. Install the dependencies:

```bash
cd sample-ldwebhook-apply-changes
npm install
```

3. Create a `.env` file in the root directory and provide the following environment variables:

```
webhook_secret=YOUR_WEBHOOK_SECRET
access_token=YOUR_LAUNCHDARKLY_ACCESS_TOKEN
```

Replace `YOUR_WEBHOOK_SECRET` with the secret key configured in your LaunchDarkly webhook settings, and `YOUR_LAUNCHDARKLY_ACCESS_TOKEN` with your LaunchDarkly access token.

4. Start the application:

```bash
npm start
```

The server will start running on `http://localhost:3000`.

## Usage

1. Configure your LaunchDarkly webhook to send events to `http://your-server-url/webhook`.

2. When a review approval request is received and the change is approved, the application will automatically apply the approval using the LaunchDarkly API.

3. The application will log the update status and the applied date of the change.

## Configuration

- `PORT`: The port on which the server will run (default: 3000).
- `webhook_secret`: The secret key used to validate incoming webhook requests from LaunchDarkly.
- `access_token`: The LaunchDarkly access token used to authenticate API requests.

## Dependencies

- `express`: Web framework for Node.js.
- `body-parser`: Middleware for parsing incoming request bodies.
- `./utils.js`: A custom module containing utility functions for handling LaunchDarkly webhook events and API requests.
