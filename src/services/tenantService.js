import { tenants as mockTenants } from '../data/tenants.js';

const LATENCY = 350;
const wait = (ms = LATENCY) => new Promise((resolve) => setTimeout(resolve, ms));

let tenantsStore = [...mockTenants];

export async function getTenants() {
  await wait();
  return [...tenantsStore];
}

export async function getTenantById(id) {
  await wait(200);
  return tenantsStore.find((t) => t.id === id) || null;
}

export async function createTenant(payload) {
  await wait(400);
  const newTenant = {
    id: `TEN-${String(tenantsStore.length + 1).padStart(4, '0')}`,
    status: 'Active',
    balance: 0,
    avatarSeed: tenantsStore.length + 1,
    ...payload,
  };
  tenantsStore = [newTenant, ...tenantsStore];
  return newTenant;
}

export async function updateTenant(id, payload) {
  await wait(300);
  tenantsStore = tenantsStore.map((t) => (t.id === id ? { ...t, ...payload } : t));
  return tenantsStore.find((t) => t.id === id);
}

export async function deleteTenant(id) {
  await wait(300);
  tenantsStore = tenantsStore.filter((t) => t.id !== id);
  return true;
}