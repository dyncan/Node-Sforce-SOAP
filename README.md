# Node-Sforce-SOAP
The sample library is based on the Node.js and supports parsing Salesforce WSDL files so that you can easily build and issue SOAP API calls

## Installation

1. Create a `.env` file in the root directory of this project and add this content (make sure to replace the values):

   ```
   USERNAME=''
   PASSWORD=''
   SECURITY_TOKEN='YOUR_TOKEN'
   ```

2. Run `npm install` to install the dependency package.

3. Download your `wsdl` file from Salesforce org: **Setup** -> Search for `API`.

4. This library includes the basic CRUD, please modify the code to get the data you want before using it.

4. Run `npm start` to start the app.
