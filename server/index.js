// Import the getClient() function from auth.js module
const { getClient } = require("./auth.js");

let client; // Initialize a variable to store the Soap client

async function createAccount() {
  // Define the Account record you want to create
  const account = {
    sObjects: {
      attributes: {
        "xsi:type": "sf:Account",
      },
      Name: "Created by SOAP API",
    },
  };

  // Call the create() operation on the Account object
  return new Promise((resolve, reject) => {
    client.create(account, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

async function updateAccount() {
  // Define the Account record you want to update
  const account = {
    sObjects: {
      attributes: {
        "xsi:type": "sf:Account",
      },
      Name: "Updated by SOAP API",
      Id: "001xxxxxxxxxxxxxxx",
    },
  };

  // Call the update() operation on the Account object
  return new Promise((resolve, reject) => {
    client.update(account, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

async function deleteAccount() {
  // Call the delete() operation on the Account object
  return new Promise((resolve, reject) => {
    client.delete({ Id: "001xxxxxxxxxxxxxxx" }, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

async function getCases() {
  // Define the SOQL query to retrieve cases
  const soql = {
    queryString: "SELECT Id, CaseNumber, Subject FROM Case LIMIT 3",
  };

  // Call the query() operation on the Case object
  return new Promise((resolve, reject) => {
    client.query(soql, function (err, res, raw) {
      if (err) {
        reject(err);
      }
      resolve(res.result.records);
    });
  });
}

(async () => {
  try {
    // Get the Salesforce client using the getClient() function
    client = await getClient();

    // Use Promise.all() to run two asynchronous operations in parallel
    const [cases, insertedAccount, updatedAccount, deletedAccount] =
      await Promise.all([
        getCases(), // Retrieve cases
        createAccount(), // Create a new Account
        updateAccount(), // Update a exist Account
        deleteAccount(), // Delete a exist Account
      ]);

    // Output the results to the console
    console.log(cases);
    console.log(insertedAccount);
    console.log(updatedAccount);
    console.log(deletedAccount);
  } catch (error) {
    console.error(error);
  }
})();
