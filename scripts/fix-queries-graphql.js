const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../libs/network/src/gql/queries.graphql');
let content = fs.readFileSync(file, 'utf8');

const fixes = [
  ['query Companies', 'query Brokerages'],
  ['companies(', 'brokerages('],
  ['garages {', 'properties {'],
  ['garages(', 'properties('],
  ['garageFilter', 'propertyFilter'],
  ['createGarage', 'createProperty'],
  ['CreateGarage', 'CreateProperty'],
  ['managers {', 'brokerageManagers {'],
  ['valets {', 'agents {'],
  ['valets(', 'agents('],
  ['createValet', 'createAgent'],
  ['CreateValet', 'CreateAgent'],
  ['bookingsForProperty', 'inquiriesForProperty'],
  ['bookingsForCustomer', 'inquiriesForCustomer'],
  ['BookingsForProperty', 'InquiriesForProperty'],
  ['BookingsForCustomer', 'InquiriesForCustomer'],
  ['createBooking', 'createInquiry'],
  ['CreateBooking', 'CreateInquiry'],
  ['slots {', 'propertyFeatures {'],
  ['slots(', 'propertyFeatures('],
  ['SearchPropertys', 'SearchProperties'],
  ['query Propertys', 'query Properties'],
  ['availableFeatures', 'featureCounts'],
];

for (const [from, to] of fixes) {
  content = content.split(from).join(to);
}

fs.writeFileSync(file, content);
console.log('queries.graphql updated');
