import { GateStatus, QueueStatus, VenueAlert } from './types';

export const mockGates: GateStatus[] = [
  { id: 'g1', name: 'North Gate Main', zone: 'North', waitTimeMinutes: 5, isOpen: true },
  { id: 'g2', name: 'North Gate Premium', zone: 'North', waitTimeMinutes: 2, isOpen: true },
  { id: 'g3', name: 'South Gate 1', zone: 'South', waitTimeMinutes: 25, isOpen: true },
  { id: 'g4', name: 'East Gate (Transit Options)', zone: 'East', waitTimeMinutes: 15, isOpen: true },
  { id: 'g5', name: 'West Gate Accessibility', zone: 'West', waitTimeMinutes: 1, isOpen: true },
];

export const mockQueues: QueueStatus[] = [
  { id: 'q1', name: 'North concourse Food', type: 'Concession', zone: 'North', waitTimeMinutes: 12, isOpen: true },
  { id: 'q2', name: 'East Quick Eats', type: 'Concession', zone: 'East', waitTimeMinutes: 4, isOpen: true },
  { id: 'q3', name: 'South Mega Store', type: 'Merchandise', zone: 'South', waitTimeMinutes: 20, isOpen: true },
  { id: 'q4', name: 'West Restroom A', type: 'Restroom', zone: 'West', waitTimeMinutes: 2, isOpen: true },
  { id: 'q5', name: 'North Restroom Central', type: 'Restroom', zone: 'North', waitTimeMinutes: 8, isOpen: true },
];

export const mockAlerts: VenueAlert[] = [
  { id: 'a1', title: 'South Gate Crowded', message: 'Heavy congestion at South Gate. Please use East Gate for faster entry.', severity: 'medium', timestamp: new Date(Date.now() - 600000).toISOString() },
  { id: 'a2', title: 'Halftime Show Set Up', message: 'Field access restricted in the South zone starting in 15 minutes.', severity: 'low', timestamp: new Date(Date.now() - 3600000).toISOString() },
];
