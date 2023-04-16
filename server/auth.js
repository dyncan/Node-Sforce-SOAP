const soap = require("soap");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Set the WSDL URL and get the environment variables
const WSDL_URL = "./wsdl.enterprise.xml";
const { USERNAME, PASSWORD, SECURITY_TOKEN } = process.env;

async function getClient() {
  // Create a SOAP client and authenticate with Salesforce
  const client = await createClient(WSDL_URL);
  const data = await login(client);

  // Extract the session ID and server URL from the login response
  const sessionId = data?.result?.sessionId;
  const serverUrl = data?.result?.serverUrl;

  // Check if the authentication was successful
  if (!sessionId || !serverUrl) {
    throw new Error("Invalid login response");
  }

  // Set the client endpoint and session header
  client.setEndpoint(serverUrl);
  client.addSoapHeader(
    { SessionHeader: { sessionId: sessionId } },
    "name",
    "tns",
    "urn:enterprise.soap.sforce.com"
  );

  return client;
}

function createClient(wsdl) {
  // Create a SOAP client using the provided WSDL URL
  return new Promise((resolve, reject) => {
    soap.createClient(wsdl, (err, client) => {
      if (err) reject(err);
      else resolve(client);
    });
  });
}

function login(client) {
  // Authenticate with Salesforce using the provided credentials
  return new Promise((resolve, reject) => {
    client.login(
      {
        username: USERNAME,
        password: PASSWORD + SECURITY_TOKEN,
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

module.exports = { getClient };
