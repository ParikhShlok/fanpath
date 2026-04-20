import { getShortestQueue } from './logic';
import { mockQueues } from './mockData';
import {
  AssistantQuery,
  RouteRecommendation,
  UserContext,
  UserPreference,
  VenueAlert,
  VenueZoneId,
} from './types';

const sectionZoneMap: Record<string, VenueZoneId> = {
  '1': 'North',
  '2': 'South',
  '3': 'East',
  '4': 'West',
};

const allowedPreferences: UserPreference[] = ['Accessible', 'VIP', 'Family'];
const severityRank: Record<VenueAlert['severity'], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function isAssistantQuery(value: unknown): value is AssistantQuery {
  return value === 'Concession' || value === 'Restroom' || value === 'Merchandise';
}

export function normalizePreferences(value: string | string[] | undefined): UserPreference[] {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.filter((item): item is UserPreference =>
    allowedPreferences.includes(item as UserPreference)
  );
}

export function zoneFromSection(section: string): VenueZoneId {
  const normalizedSection = section.trim();
  return sectionZoneMap[normalizedSection.charAt(0)] ?? 'North';
}

export function buildUserContextFromSearchParams(
  params: Record<string, string | string[] | undefined>
): UserContext {
  const sectionValue = Array.isArray(params.section) ? params.section[0] : params.section;
  const section = sectionValue?.trim() || '101';
  const preferences = normalizePreferences(params.preference);

  return {
    section,
    preferences,
    needsAccessibility: preferences.includes('Accessible'),
    currentZone: zoneFromSection(section),
  };
}

export function getHighestPriorityAlert(alerts: VenueAlert[]): VenueAlert | undefined {
  return [...alerts].sort((left, right) => severityRank[right.severity] - severityRank[left.severity])[0];
}

export function buildFallbackRecommendation(
  query: AssistantQuery,
  userContext: Pick<UserContext, 'currentZone'>
): RouteRecommendation {
  return getShortestQueue(query, userContext.currentZone, mockQueues);
}
