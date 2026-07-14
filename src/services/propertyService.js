import { properties as mockProperties } from '../data/properties.js';
import { units as mockUnits } from '../data/units.js';

// Simulated network latency so loaders/skeletons have something real to show.
const LATENCY = 350;
const wait = (ms = LATENCY) => new Promise((resolve) => setTimeout(resolve, ms));

let propertiesStore = [...mockProperties];

export async function getProperties() {
  await wait();
  return [...propertiesStore];
}

export async function getPropertyById(id) {
  await wait(200);
  return propertiesStore.find((p) => p.id === id) || null;
}

export async function getUnitsByProperty(propertyId) {
  await wait(200);
  return mockUnits.filter((u) => u.propertyId === propertyId);
}

export async function getAllUnits() {
  await wait(200);
  return [...mockUnits];
}

export async function createProperty(payload) {
  await wait(400);
  const newProperty = {
    id: `PROP-${String(propertiesStore.length + 1).padStart(3, '0')}`,
    occupiedUnits: 0,
    vacantUnits: Number(payload.totalUnits) || 0,
    amenities: payload.amenities || [],
    imageColor: '#1a7a5c',
    createdAt: new Date().toISOString().slice(0, 10),
    photos: payload.photos || [],
    roomPhotos: payload.roomPhotos || [],
    ...payload,
  };
  propertiesStore = [newProperty, ...propertiesStore];
  return newProperty;
}

export async function deleteProperty(id) {
  await wait(300);
  propertiesStore = propertiesStore.filter((p) => p.id !== id);
  return true;
}