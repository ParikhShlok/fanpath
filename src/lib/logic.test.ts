import { describe, expect, it } from 'vitest';
import { getBestGate, getShortestQueue } from './logic';
import { mockGates, mockQueues, mockZones } from './mockData';
import { buildUserContextFromSearchParams, zoneFromSection } from './venue';

describe('getBestGate', () => {
  it('prioritizes accessible routing when needed', () => {
    const recommendation = getBestGate(
      {
        section: '412',
        preferences: ['Accessible'],
        needsAccessibility: true,
        currentZone: 'West',
      },
      mockGates,
      mockZones
    );

    expect(recommendation.to).toContain('Accessibility');
    expect(recommendation.estimatedMinutes).toBe(1);
  });

  it('keeps attendees in their own zone when it is efficient', () => {
    const recommendation = getBestGate(
      {
        section: '101',
        preferences: [],
        needsAccessibility: false,
        currentZone: 'North',
      },
      mockGates,
      mockZones
    );

    expect(recommendation.to).toBe('North Premium (Fast Track)');
  });
});

describe('getShortestQueue', () => {
  it('returns the shortest local queue when available', () => {
    const recommendation = getShortestQueue('Restroom', 'North', mockQueues);
    expect(recommendation.to).toBe('Restroom in North');
    expect(recommendation.estimatedMinutes).toBe(8);
  });

  it('reroutes to another zone when needed', () => {
    const recommendation = getShortestQueue('Merchandise', 'North', mockQueues);
    expect(recommendation.to).toBe('Merchandise in South');
    expect(recommendation.estimatedMinutes).toBe(26);
  });
});

describe('venue helpers', () => {
  it('maps sections to the expected zone', () => {
    expect(zoneFromSection('318')).toBe('East');
  });

  it('builds user context from search params', () => {
    const user = buildUserContextFromSearchParams({
      section: '224',
      preference: ['Accessible', 'VIP'],
    });

    expect(user.currentZone).toBe('South');
    expect(user.needsAccessibility).toBe(true);
    expect(user.preferences).toEqual(['Accessible', 'VIP']);
  });
});
