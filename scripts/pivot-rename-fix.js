const fs = require('fs');
const path = require('path');

const roots = [
  'apps/api/src',
  'libs',
  'apps/web',
  'apps/web-manager',
  'apps/web-admin',
  'apps/web-valet',
].map((p) => path.join(__dirname, '..', p));

const fixes = [
  ['Inquirys', 'Inquiries'],
  ['brokerageBrokerageManager', 'brokerageManager'],
  ['entity/manager.entity', 'entity/brokerage-manager.entity'],
  ['../bookings/', '../inquiries/'],
  ['bookings.service', 'inquiries.service'],
  ['create-booking-timeline.input', 'create-inquiry-timeline.input'],
  ['update-booking-timeline.input', 'update-inquiry-timeline.input'],
  ['entity/booking-timeline.entity', 'entity/inquiry-timeline.entity'],
  ['bookingTimelinesService', 'inquiryTimelinesService'],
  ['slotsService', 'propertyFeaturesService'],
  ['garagesService', 'propertiesService'],
  ["@ApiTags('garages')", "@ApiTags('properties')"],
  ["@Controller('garages')", "@Controller('properties')"],
  ["{ name: 'slots' }", "{ name: 'propertyFeatures' }"],
  ["{ name: 'slot' }", "{ name: 'propertyFeature' }"],
  ["{ name: 'garages' }", "{ name: 'properties' }"],
  ["{ name: 'garagesCount' }", "{ name: 'propertiesCount' }"],
  ["{ name: 'garage' }", "{ name: 'property' }"],
  ['ListCustomerInquirys', 'ListCustomerInquiries'],
  ['ShowCustomerInquirys', 'ShowCustomerInquiries'],
  ['InquirysForCustomer', 'InquiriesForCustomer'],
  ['InquirysForProperty', 'InquiriesForProperty'],
  ['bookingData', 'inquiryData'],
  ['bookingsForProperty', 'inquiriesForProperty'],
  ['bookingsForCustomer', 'inquiriesForCustomer'],
  ['bookingsService', 'inquiriesService'],
  ['valetAssignment', 'agentAssignment'],
  ['ResolveField(() => Agent', 'ResolveField(() => Agent'],
];

function walk(dir, cb) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (['node_modules', 'generated', 'dist'].includes(ent.name)) continue;
      walk(p, cb);
    } else if (/\.(ts|tsx|graphql)$/.test(ent.name)) {
      cb(p);
    }
  }
}

let count = 0;
for (const root of roots) {
  walk(root, (file) => {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    for (const [from, to] of fixes) {
      content = content.split(from).join(to);
    }
    if (content !== original) {
      fs.writeFileSync(file, content);
      count++;
    }
  });
}

console.log(`updated ${count} files`);
