export type VenueZone = 'North' | 'South' | 'East' | 'West';

export interface GateStatus {
  id: string;
  name: string;
  zone: VenueZone;
  waitTimeMinutes: number;
  isOpen: boolean;
}

export interface QueueStatus {
  id: string;
  name: string;
  type: 'Restroom' | 'Concession' | 'Merchandise';
  zone: VenueZone;
  waitTimeMinutes: number;
  isOpen: boolean;
}

export interface VenueAlert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export interface RouteRecommendation {
  pathSteps: string[];
  estimatedTimeMinutes: number;
  reason: string;
}

export interface UserContext {
  seatSection: string;
  preferredZone: VenueZone;
  needsAccessibility: boolean;
}
