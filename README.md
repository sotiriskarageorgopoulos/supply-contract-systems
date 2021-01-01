# Supply Contract Systems RESTFUL API

This API is used for modifying, fetching and sending data to a MongoDB ATLAS database. Particularly, includes 17 endpoints, which are presented in the below table.

Endpoints|Method|Parameters|Description
---|---|---|---
/api/login/clerk|POST|-|Used for authentication of clerk.
/api/login/supplier|POST|-|Used for authentication of supplier.
/api/register/clerk|POST|-|Used for the registration of clerk.
/api/register/supplier|POST|-|Used for the registration of supplier.
/api/publish_tender_announcement|POST|-|Used for the publication of a tender announcement.
/api/send_tender|POST|-|Used for sending tenders a tenderer to hospitals.
/api/send_tender_response|POST|-|Used for sending response a hospital to tenderers.
/api/tender_announcement/:id|GET|id=[string], is reffered to hospital id.|Used for fetching a tender annoucement by hospital id
/api/tender_announcements|GET|-|Used for fetching all tender announcements
/api/tenders/:label|GET|label=[string],is reffered to hospital label.|Used for fetching tenders that are related to a hospital.
/api/tender/:id|GET|id=[string], is reffered to supplier id.|Used for fetching a tender by supplier id.
/api/tender_response/:id|GET|id=[string], is reffered to supplier id.|Used for fetching a response which concerns a tenderer.
/api/tender_responses/:id|GET|id=[string], is reffered to supplier id.|Used for fetching responses which concern a tenderer.
/api/hospitals|GET|-|Used for fetching details for all registered hospitals
/api/hospital/:id|GET|id=[string], is reffered to hospital id.|Used for fetching details for a hospital.
/api/clerk/:email|GET|email=[string], is reffered to clerk's email|Used for fetching details for a clerk by his/her email.
/api/supplier/:email|GET|email=[string], is reffered to clerk's email|Used for fetching details for a supplier by email.



## Installation Guide

1. Download the app from github with the below command.
```
git clone https://github.com/sotiriskarageorgopoulos/supply-contract-systems.git --single-branch --branch api
```

2. Use the package manager [npm](https://www.npmjs.com/) to install the dependencies of API.

```
npm install 
```

3. Create a MongoDB Atlas database.

4. Create a .env file in the project's root folder with the following configuration.
```
CONNECTION_STRING=mongodb+srv://<user>:<pass>@cluster0.zzrtt.mongodb.net/<database_name>?retryWrites=true&w=majority
DIR=the_full_path_of_your_project // is used for reading the digital certificate and the private key for digital signature
PORT=3000 //The port is running your API
```
5. Create a digital certificate with a private key in the project's root folder.
```
openssl req -newkey rsa:4096 -x509 -nodes -keyout key.pem -out certificate.pem 
```
6. Run API with the following command.
```
npm run dev
```
## Author
Sotiris Karageorgopoulos

## License
[MIT](https://choosealicense.com/licenses/mit/)