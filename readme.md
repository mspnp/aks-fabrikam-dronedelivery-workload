## Invoice Load Testing

### Prerequisites
a. Microsoft Visual Studio 2017 or later Enterprise Edition
b. Web performance and load testing tools must be installed. For more information, please take a look at [Install the Load testing component](https://docs.microsoft.com/en-us/visualstudio/test/quickstart-create-a-load-test-project?view=vs-2017#install-the-load-testing-component)
c. Azure DevOps subscription
d. ```EXTERNAL_INGEST_FQDN``` value from [deployment instructions](../../microservices-reference-implementation/deployment.md)

### Run load testing in Azure DevOps

1. open Microsoft Visual Studio 2017 or later
2. open the solution ./Fabrikam.Shipping.LoadTests.sln
3. navigate to Team Explorer and connect to your Azure DevOps subscription
4. double click on InvoiceRequestLoadTest.loadtest
   > if the xml is open instead of the load test designer.
   Right click on .loadtest file from the Solution Explorer, and then click ```Open With``` and select Load Test Editor
5. double click ```INGEST_URL``` Context Parameter
6. from Properties panel, set its value using the environment variable ```EXTERNAL_INGEST_FQDN``` as shown below:
   > https://```$EXTERNAL_INGEST_FQDN```

   > Important: the url should look like, https://```<external-dns-ingestion-name>.<region>```.cloudapp.azure.com
7. click Run Load Test
   > if the ```EXTERNAL_INGEST_FQDN``` was not configured properly it is noticed from Test Results ```Graph``` because Total Requests metric is 0.
   Please check from ```Details``` looking for errors and ensure the check FQDN is well formed.

> Note: this load test executes two separate scenarios against the GET invoicing endpoint, the first one will use a single user to send up to 20 request/sec.
While the second scenario is designed to load 40 users to deliver up to 75 request/sec.
