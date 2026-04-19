import { VenueZone, GateStatus, QueueStatus, Amenity, VenueAlert } from './types';

export const mockZones: VenueZone[] = [
  { id: 'North', label: 'North Entrance Hall', congestionLevel: 'medium', crowdTrend: 'increasing' },
  { id: 'South', label: 'South Gateway', congestionLevel: 'high', crowdTrend: 'stable' },
  { id: 'East', label: 'East Transit Hub', congestionLevel: 'low', crowdTrend: 'decreasing' },
  { id: 'West', label: 'West VIP & ACC', congestionLevel: 'low', crowdTrend: 'stable' },
];

export const mockGates: GateStatus[] = [
  { id: 'g1', zone: 'North', name: 'North Gate Main', crowdScore: 65, estimatedEntryTime: 5, isOpen: true },
  { id: 'g2', zone: 'North', name: 'North Premium (Fast Track)', crowdScore: 20, estimatedEntryTime: 2, isOpen: true },
  { id: 'g3', zone: 'South', name: 'South Gate 1', crowdScore: 90, estimatedEntryTime: 25, isOpen: true },
  { id: 'g4', zone: 'East', name: 'East Transit Express', crowdScore: 40, estimatedEntryTime: 12, isOpen: true },
  { id: 'g5', zone: 'West', name: 'West Gate Accessibility', crowdScore: 10, estimatedEntryTime: 1, isOpen: true },
];

export const mockAmenities: Amenity[] = [
  { id: 'a1', name: 'North Concourse Burgers', type: 'Concession', zone: 'North', distanceCues: 'Near Sec 110' },
  { id: 'a2', name: 'East Quick Eats', type: 'Concession', zone: 'East', distanceCues: 'Near East Atrium' },
  { id: 'a3', name: 'South Mega Store', type: 'Merchandise', zone: 'South', distanceCues: 'Main South Concourse' },
  { id: 'a4', name: 'West Restroom Suite', type: 'Restroom', zone: 'West', distanceCues: 'Behind Sec 402' },
  { id: 'a5', name: 'North Restroom Central', type: 'Restroom', zone: 'North', distanceCues: 'Near Information Booth' },
];

export const mockQueues: QueueStatus[] = [
  { id: 'q1', type: 'Concession', zone: 'North', estimatedWait: 12 },
  { id: 'q2', type: 'Concession', zone: 'East', estimatedWait: 4 },
  { id: 'q3', type: 'Merchandise', zone: 'South', estimatedWait: 20 },
  { id: 'q4', type: 'Restroom', zone: 'West', estimatedWait: 2 },
  { id: 'q5', type: 'Restroom', zone: 'North', estimatedWait: 8 },
];

export const mockAlerts: VenueAlert[] = [
  { 
    id: 'alert1',
    severity: 'high',
    affectedZones: ['South'],
    title: 'South Gate Congestion',
    message: 'High crowd density detected at South gates due to earlier train arrival.',
    suggestedAction: 'Reroute to East or North gates for entry under 15 minutes.',
    timestamp: new Date().toISOString()
  },
  { 
    id: 'alert2',
    severity: 'low',
    affectedZones: ['West'],
    title: 'Elevator Maintenance',
    message: 'West elevator 2 is down. Using backup lifts.',
    suggestedAction: 'Expect minor delays for accessible routing in West zone.',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
];
