import { AppUser } from '../types';

export const predefinedUsers: Record<'farmer' | 'transporter' | 'vendor', AppUser> = {
  farmer: {
    id: 'PAT-SAT-482',
    role: 'farmer',
    name: 'Ramesh Patil',
    phone: '9423811092',
    location: 'Koregaon, Satara District',
    identifier: '7/12 Gat No. 142 • 4.5 Acres Onion Farm',
    avatarEmoji: '🌾',
    badge: 'KYC Verified Farmer',
    verified: true,
  },
  transporter: {
    id: 'TR-102',
    role: 'transporter',
    name: 'Suresh Shinde',
    phone: '9822044102',
    location: 'Satara Transport Hub',
    identifier: 'MH-11-BV-8402 (14ft Eicher Canter)',
    avatarEmoji: '🚚',
    badge: 'Verified Fleet Partner #TR-102',
    verified: true,
  },
  vendor: {
    id: 'BY-VSH-901',
    role: 'vendor',
    name: 'Apex Urban Grocery Syndicate',
    phone: '9821055667',
    location: 'Vashi APMC Terminal, Navi Mumbai',
    identifier: 'License #APMC-VSH-884 • Yard #12',
    avatarEmoji: '🛒',
    badge: 'Verified Wholesale Buyer',
    verified: true,
  },
};
