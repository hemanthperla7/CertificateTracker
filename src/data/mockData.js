export const USERS = [
  {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@certify.pro',
    password: 'admin123',
    role: 'admin',
    initials: 'AU',
    color: '#7C6EE3',
  },
  {
    id: 'john',
    name: 'John Mitchell',
    email: 'john@example.com',
    password: 'user123',
    role: 'user',
    initials: 'JM',
    color: '#7C6EE3',
  },
  {
    id: 'sarah',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    password: 'user123',
    role: 'user',
    initials: 'SC',
    color: '#6B8EDE',
  },
];

export const CERTIFICATIONS_INITIAL = [
  {
    id: 'cert-001',
    userId: 'john',
    name: 'Certified Scrum Master (CSM)',
    issuer: 'Scrum Alliance',
    certNumber: 'CSM-0001876S4',
    category: 'Project Management',
    issueDate: '2022-01-10',
    expiryDate: '2024-01-10',
    status: 'expired',
    renewalStatus: null,
    credentialUrl: '',
    notes: '',
  },
  {
    id: 'cert-002',
    userId: 'john',
    name: 'Google Professional Cloud Architect',
    issuer: 'Google Cloud',
    certNumber: 'GCP-PCA-2024-7821',
    category: 'Cloud Computing',
    issueDate: '2023-08-01',
    expiryDate: '2026-03-10',
    status: 'expiring',
    renewalStatus: null,
    credentialUrl: '',
    notes: '',
  },
  {
    id: 'cert-003',
    userId: 'john',
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    certNumber: 'CKA-2024-1M-7654',
    category: 'DevOps',
    issueDate: '2024-10-15',
    expiryDate: '2026-10-15',
    status: 'renewal_pending',
    renewalStatus: 'pending',
    credentialUrl: '',
    notes: '',
  },
  {
    id: 'cert-004',
    userId: 'john',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    certNumber: 'AWS-SAA-CR3-JM2024',
    category: 'Cloud Computing',
    issueDate: '2024-06-15',
    expiryDate: '2027-06-15',
    status: 'active',
    renewalStatus: null,
    credentialUrl: '',
    notes: '',
  },
  {
    id: 'cert-005',
    userId: 'sarah',
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    certNumber: 'COMP-SEC-2021-9823',
    category: 'Cybersecurity',
    issueDate: '2021-06-01',
    expiryDate: '2024-06-01',
    status: 'expired',
    renewalStatus: null,
    credentialUrl: '',
    notes: '',
  },
  {
    id: 'cert-006',
    userId: 'sarah',
    name: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    certNumber: 'TF-DEV-2024-3312',
    category: 'Data Science & AI',
    issueDate: '2024-02-20',
    expiryDate: '2026-03-20',
    status: 'expiring',
    renewalStatus: null,
    credentialUrl: '',
    notes: '',
  },
  {
    id: 'cert-007',
    userId: 'sarah',
    name: 'PMP – Project Management Professional',
    issuer: 'PMI',
    certNumber: 'PMP-PMI-2023-4455',
    category: 'Project Management',
    issueDate: '2023-03-10',
    expiryDate: '2026-03-10',
    status: 'active',
    renewalStatus: null,
    credentialUrl: '',
    notes: '',
  },
  {
    id: 'cert-008',
    userId: 'sarah',
    name: 'Certified Information Systems Security Professional (CISSP)',
    issuer: 'ISC²',
    certNumber: 'CISSP-2023-9087',
    category: 'Cybersecurity',
    issueDate: '2023-09-01',
    expiryDate: '2026-09-01',
    status: 'active',
    renewalStatus: null,
    credentialUrl: '',
    notes: '',
  },
  {
    id: 'cert-009',
    userId: 'sarah',
    name: 'Microsoft Azure Solutions Architect',
    issuer: 'Microsoft',
    certNumber: 'AZ-305-SAR-2024-8821',
    category: 'Cloud Computing',
    issueDate: '2024-01-20',
    expiryDate: '2026-01-20',
    status: 'active',
    renewalStatus: null,
    credentialUrl: '',
    notes: '',
  },
];

export function computeStatus(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffMs = expiry - today;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'expired';
  if (diffDays <= 90) return 'expiring';
  return 'active';
}

export function getDaysLeft(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffMs = expiry - today;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
