import { payments as mockPayments } from '../data/payments.js';

const LATENCY = 350;
const wait = (ms = LATENCY) => new Promise((resolve) => setTimeout(resolve, ms));

let paymentsStore = [...mockPayments];

export async function getPayments() {
  await wait();
  return [...paymentsStore];
}

export async function getPaymentById(id) {
  await wait(200);
  return paymentsStore.find((p) => p.id === id) || null;
}

export async function getRecentPayments(count = 5) {
  await wait(200);
  return [...paymentsStore].slice(0, count);
}

export async function createPayment(payload) {
  await wait(450);
  const newPayment = {
    id: `PAY-${String(paymentsStore.length + 1).padStart(4, '0')}`,
    status: 'Successful',
    date: new Date().toISOString().slice(0, 10),
    reference: `KLG${new Date().getFullYear()}${String(paymentsStore.length + 1).padStart(5, '0')}`,
    receiptNo: `RCT-${10000 + paymentsStore.length + 1}`,
    ...payload,
  };
  paymentsStore = [newPayment, ...paymentsStore];
  return newPayment;
}

export async function deletePayment(id) {
  await wait(300);
  paymentsStore = paymentsStore.filter((p) => p.id !== id);
  return true;
}