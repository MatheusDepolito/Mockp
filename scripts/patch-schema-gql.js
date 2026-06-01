const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '../apps/api/src/schema.gql');
let content = fs.readFileSync(schemaPath, 'utf8');

const fixes = [
  ['companies(', 'brokerages('],
  ['company(where:', 'brokerage(where:'],
  ['garages(', 'properties('],
  ['garage(where:', 'property(where:'],
  ['garagesCount', 'propertiesCount'],
  ['garageFilter:', 'propertyFilter:'],
  ['bookingsForAgent', 'inquiriesForAgent'],
  ['bookingsForCustomer', 'inquiriesForCustomer'],
  ['bookingsForProperty', 'inquiriesForProperty'],
  ['bookingsCount', 'inquiriesCount'],
  ['bookings(', 'inquiries('],
  ['booking(where:', 'inquiry(where:'],
  ['bookingTimelines(', 'inquiryTimelines('],
  ['bookingTimeline(where:', 'inquiryTimeline(where:'],
  ['valetAssignments(', 'agentAssignments('],
  ['valetAssignment(where:', 'agentAssignment(where:'],
  ['  bookingTimeline:', '  inquiryTimeline:'],
  ['  valetAssignment:', '  agentAssignment:'],
  ['  garages:', '  properties:'],
  ['  managers:', '  brokerageManagers:'],
  ['  slots:', '  propertyFeatures:'],
  ['slots(', 'propertyFeatures('],
  ['slot(where:', 'propertyFeature(where:'],
  ['  slot:', '  propertyFeature:'],
  ['  garage:', '  property:'],
  ['pickupAgent:', 'assignedAgent:'],
  ['returnAgent:', 'assignedAgent:'],
];

for (const [from, to] of fixes) {
  content = content.split(from).join(to);
}

fs.writeFileSync(schemaPath, content);
console.log('schema.gql patched');
