import fs from 'fs';

// Deterministic PRNG so data is stable across regenerations
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260708);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const int = (min, max) => Math.floor(rand() * (max - min + 1)) + min;

const districts = [
  'Kampala', 'Wakiso', 'Mukono', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu',
  'Mbale', 'Masaka', 'Arua', 'Fort Portal', 'Lira', 'Hoima', 'Kabale', 'Soroti',
];

const areasByDistrict = {
  Kampala: ['Nakawa', 'Kololo', 'Bugolobi', 'Ntinda', 'Kamwokya', 'Muyenga', 'Naguru', 'Kansanga'],
  Wakiso: ['Kira', 'Kasangati', 'Namugongo', 'Bwebajja', 'Nansana', 'Bujuuko'],
  Mukono: ['Seeta', 'Goma', 'Kyabakadde', 'Namilyango'],
  Entebbe: ['Kitoro', 'Nsamizi', 'Katabi', 'Abaita Ababiri'],
  Jinja: ['Walukuba', 'Bugembe', 'Njeru', 'Mpumudde'],
  Mbarara: ['Kakoba', 'Nyamitanga', 'Biharwe'],
  Gulu: ['Bardege', 'Layibi', 'Pece'],
  Mbale: ['Namatala', 'Nkoma', 'Wanale'],
  Masaka: ['Nyendo', 'Kimaanya', 'Katwe-Butego'],
  Arua: ['River Oli', 'Adumi Road', 'Pajulu'],
  'Fort Portal': ['Boma', 'Kabundaire', 'Karambi'],
  Lira: ['Adyel', 'Ojwina', 'Railway'],
  Hoima: ['Kahoora', 'Busiisi', 'Bujumbura Ward'],
  Kabale: ['Kabale Central', 'Kirigime', 'Kikungiri'],
  Soroti: ['Soroti Central', 'Arapai', 'Bugondo'],
};

const streetWords = ['Acacia', 'Kiwatule', 'Kira Road', 'Bukoto', 'Spring', 'Lubowa', 'Nsambya', 'Ggaba Road', 'Bunga', 'Kyanja', 'Namasuba', 'Kulambiro'];

const firstNamesM = ['David', 'Peter', 'John', 'Emmanuel', 'Joseph', 'Ronald', 'Brian', 'Isaac', 'Moses', 'Samuel', 'Ivan', 'Allan', 'Denis', 'Robert', 'Kenneth', 'Godfrey', 'Vincent', 'Patrick', 'Herbert', 'Julius'];
const firstNamesF = ['Sarah', 'Grace', 'Patricia', 'Esther', 'Joan', 'Brenda', 'Diana', 'Florence', 'Irene', 'Betty', 'Doreen', 'Sandra', 'Winnie', 'Agnes', 'Ritah', 'Sharon', 'Christine', 'Immaculate', 'Prossy', 'Faith'];
const lastNames = ['Mukasa', 'Nakato', 'Okello', 'Kintu', 'Ssebunya', 'Namutebi', 'Kagwa', 'Nabirye', 'Tumwine', 'Kyeyune', 'Atim', 'Aceng', 'Ochieng', 'Wamala', 'Nakabuye', 'Ssenyonga', 'Byaruhanga', 'Nsubuga', 'Kiggundu', 'Nalubega', 'Mugisha', 'Nantongo', 'Katamba', 'Auma', 'Opio'];

const propertyTypes = ['Apartment Block', 'Residential Estate', 'Commercial Plaza', 'Bungalow Complex', 'Mixed-Use Building', 'Townhouses'];
const propertyAdjectives = ['Greenview', 'Palm Court', 'Sunrise', 'Cornerstone', 'Riverside', 'Kolagenda', 'Silver Oak', 'Hillside', 'Garden City', 'Lakeview', 'Heritage', 'Golden Acres', 'Meridian', 'Crescent', 'Fairview'];

function ugPhone() {
  const prefixes = ['070', '071', '074', '075', '077', '078', '039'];
  const p = pick(prefixes);
  let rest = '';
  for (let i = 0; i < 7; i++) rest += int(0, 9);
  return `+256 ${p.slice(1)}${rest.slice(0, 1)} ${rest.slice(1, 4)} ${rest.slice(4, 7)}`;
}

function fullName() {
  const isMale = rand() > 0.5;
  const first = isMale ? pick(firstNamesM) : pick(firstNamesF);
  const last = pick(lastNames);
  return `${first} ${last}`;
}

// ---------- Properties ----------
const properties = [];
for (let i = 1; i <= 15; i++) {
  const district = pick(districts);
  const area = pick(areasByDistrict[district]);
  const type = pick(propertyTypes);
  const name = `${pick(propertyAdjectives)} ${type}`;
  const totalUnits = int(6, 40);
  const occupied = int(Math.floor(totalUnits * 0.55), totalUnits);
  properties.push({
    id: `PROP-${String(i).padStart(3, '0')}`,
    name,
    type,
    district,
    area,
    address: `Plot ${int(1, 220)}, ${pick(streetWords)} Road, ${area}, ${district}`,
    totalUnits,
    occupiedUnits: occupied,
    vacantUnits: totalUnits - occupied,
    manager: fullName(),
    managerPhone: ugPhone(),
    yearBuilt: int(2004, 2023),
    monthlyRentRange: [int(250, 600) * 1000, int(700, 3500) * 1000],
    amenities: (() => {
      const all = ['Perimeter Wall', 'CCTV', 'Borehole Water', 'Backup Generator', 'Parking', 'Security Guard', 'Playground', 'Rooftop Terrace'];
      const count = int(2, 5);
      const shuffled = [...all].sort(() => rand() - 0.5);
      return shuffled.slice(0, count);
    })(),
    imageColor: pick(['#1a7a5c', '#cc9522', '#ac4e2b', '#146349', '#a37619']),
    createdAt: `202${int(2, 5)}-${String(int(1, 12)).padStart(2, '0')}-${String(int(1, 28)).padStart(2, '0')}`,
  });
}

// ---------- Units (derived, attached inline per property for simplicity of tenants linkage) ----------
const unitTypes = ['Studio', 'Single Room', 'One Bedroom', 'Two Bedroom', 'Three Bedroom', 'Shop', 'Office Space'];
const units = [];
let unitCounter = 1;
properties.forEach((property) => {
  for (let u = 1; u <= property.totalUnits; u++) {
    const isOccupied = u <= property.occupiedUnits;
    const unitType = pick(unitTypes);
    const rent = int(property.monthlyRentRange[0] / 1000, property.monthlyRentRange[1] / 1000) * 1000;
    units.push({
      id: `UNIT-${String(unitCounter).padStart(4, '0')}`,
      propertyId: property.id,
      propertyName: property.name,
      unitNumber: `${String.fromCharCode(65 + ((u - 1) % 6))}${Math.ceil(u / 6)}`,
      unitType,
      rent,
      status: isOccupied ? 'Occupied' : 'Vacant',
      floor: Math.ceil(u / 6),
    });
    unitCounter++;
  }
});

const occupiedUnits = units.filter((u) => u.status === 'Occupied');

// ---------- Tenants ----------
const tenants = [];
const idTypes = ['National ID', 'Passport', 'Driving Permit'];
for (let i = 1; i <= 100; i++) {
  const unit = occupiedUnits[i - 1] || pick(occupiedUnits);
  const name = fullName();
  const moveIn = `202${int(2, 5)}-${String(int(1, 12)).padStart(2, '0')}-${String(int(1, 28)).padStart(2, '0')}`;
  const statusRoll = rand();
  const status = statusRoll > 0.85 ? 'Overdue' : statusRoll > 0.15 ? 'Active' : 'Notice Period';
  tenants.push({
    id: `TEN-${String(i).padStart(4, '0')}`,
    name,
    email: `${name.toLowerCase().replace(/[^a-z ]/g, '').replace(/ /g, '.')}${int(1, 99)}@mail.com`,
    phone: ugPhone(),
    nationalIdType: pick(idTypes),
    propertyId: unit.propertyId,
    propertyName: unit.propertyName,
    unitId: unit.id,
    unitNumber: unit.unitNumber,
    rentAmount: unit.rent,
    moveInDate: moveIn,
    leaseEndDate: `202${int(6, 7)}-${String(int(1, 12)).padStart(2, '0')}-${String(int(1, 28)).padStart(2, '0')}`,
    status,
    balance: status === 'Overdue' ? int(1, 3) * unit.rent : 0,
    emergencyContact: fullName(),
    emergencyPhone: ugPhone(),
    avatarSeed: i,
  });
}

// ---------- Payments ----------
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const paymentMethods = ['Mobile Money (MTN)', 'Mobile Money (Airtel)', 'Bank Transfer', 'Cash', 'Cheque'];
const payments = [];
for (let i = 1; i <= 150; i++) {
  const tenant = pick(tenants);
  const monthIdx = int(0, 11);
  const year = monthIdx <= 6 ? 2026 : 2025;
  const statusRoll = rand();
  const status = statusRoll > 0.88 ? 'Failed' : statusRoll > 0.78 ? 'Pending' : 'Successful';
  const paidDate = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(int(1, 28)).padStart(2, '0')}`;
  payments.push({
    id: `PAY-${String(i).padStart(4, '0')}`,
    tenantId: tenant.id,
    tenantName: tenant.name,
    propertyName: tenant.propertyName,
    unitNumber: tenant.unitNumber,
    amount: tenant.rentAmount,
    method: pick(paymentMethods),
    monthFor: `${months[monthIdx]} ${year}`,
    date: paidDate,
    status,
    reference: `KLG${year}${String(i).padStart(5, '0')}`,
    receiptNo: `RCT-${String(10000 + i)}`,
  });
}
payments.sort((a, b) => new Date(b.date) - new Date(a.date));

// ---------- Write files ----------
const banner = `// Auto-generated mock data — Rent Collection System (Uganda)\n// Do not fetch from a network; this file is the single source of truth for mock data.\n\n`;

fs.writeFileSync('src/data/properties.js', banner + `export const properties = ${JSON.stringify(properties, null, 2)};\n`);
fs.writeFileSync('src/data/units.js', banner + `export const units = ${JSON.stringify(units, null, 2)};\n`);
fs.writeFileSync('src/data/tenants.js', banner + `export const tenants = ${JSON.stringify(tenants, null, 2)};\n`);
fs.writeFileSync('src/data/payments.js', banner + `export const payments = ${JSON.stringify(payments, null, 2)};\n`);

console.log('Generated:', properties.length, 'properties |', units.length, 'units |', tenants.length, 'tenants |', payments.length, 'payments');