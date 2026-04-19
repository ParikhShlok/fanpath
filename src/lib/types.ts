export type VenueZoneId = 'North' | 'South' | 'East' | 'West';

export interface VenueZone {
  id: VenueZoneId;
  label: string;
  congestionLevel: 'low' | 'medium' | 'high';
  crowdTrend: 'increasing' | 'stable' | 'decreasing';
}

export interface GateStatus {
  id: string;
  zone: VenueZoneId;
  name: string;
  crowdScore: number; // 0-100
  estimatedEntryTime: number; // minutes
  isOpen: boolean;
}

export interface QueueStatus {
  id: string;
  type: 'Restroom' | 'Concession' | 'Merchandise';
  zone: VenueZoneId;
  estimatedWait: number; // minutes
}

export interface Amenity {
  id: string;
  name: string;
  type: 'Restroom' | 'Concession' | 'Merchandise';
  zone: VenueZoneId;
  distanceCues: string; // e.g., "Near Section 104"
}

export interface VenueAlert {
  id: string;
  severity: 'low' | 'medium' | 'high';
  affectedZones: VenueZoneId[];
  title: string;
  message: string;
  suggestedAction: string;
  timestamp: string;
}

export interface RouteRecommendation {
  from: string;
  to: string;
  pathSummary: string[];
  estimatedMinutes: number;
  reason: string;
}

export interface UserContext {
  section: string;
  preferences: string[];
  needsAccessibility: boolean;
  arrivalGate?: string;
  currentZone: VenueZoneId;
}
