import { GateStatus, UserContext, QueueStatus, RouteRecommendation, VenueZoneId, VenueZone } from './types';

export function getBestGate(user: UserContext, gates: GateStatus[], zones: VenueZone[]): RouteRecommendation {
  const openGates = gates.filter(g => g.isOpen);
  if (openGates.length === 0) {
    return { from: 'Outside', to: 'Closed', pathSummary: [], estimatedMinutes: 0, reason: 'All gates are currently closed.' };
  }

  if (user.needsAccessibility) {
    const adaGates = openGates.filter(g => g.name.toLowerCase().includes('accessibility'));
    if (adaGates.length > 0) {
      const bestAda = adaGates.sort((a, b) => a.estimatedEntryTime - b.estimatedEntryTime)[0];
      return {
        from: 'Outside',
        to: bestAda.name,
        pathSummary: [`Navigate to ${bestAda.name} at the ${bestAda.zone} entrance.`, `Use dedicated ADA entry lanes.`],
        estimatedMinutes: bestAda.estimatedEntryTime,
        reason: 'Optimal accessible routing with lowest waiting time.'
      };
    }
  }

  // Filter out gates in zones that have a "high" congestion and "increasing" crowdTrend
  const discouragedZones = zones.filter(z => z.congestionLevel === 'high' && z.crowdTrend === 'increasing').map(z => z.id);
  const preferredGates = openGates.filter(g => g.zone === user.currentZone && !discouragedZones.includes(g.zone));

  let bestGate: GateStatus;

  if (preferredGates.length > 0) {
    bestGate = preferredGates.sort((a, b) => a.crowdScore - b.crowdScore)[0];
    
    // Evaluate if another gate is globally much better despite the walk
    const globalBest = openGates.sort((a, b) => a.estimatedEntryTime - b.estimatedEntryTime)[0];
    if (globalBest.estimatedEntryTime < bestGate.estimatedEntryTime - 15 && !discouragedZones.includes(globalBest.zone)) {
       return {
         from: 'Outside',
         to: globalBest.name,
         pathSummary: [`Walk around to the ${globalBest.zone} concourse.`, `Enter via ${globalBest.name}.`],
         estimatedMinutes: globalBest.estimatedEntryTime + 5, // add walk time
         reason: `Your desired zone (${user.currentZone}) is congested. Rerouting saves significant time.`
       };
    }

    return {
      from: 'Outside',
      to: bestGate.name,
      pathSummary: [`Proceed to your section via ${bestGate.name}.`],
      estimatedMinutes: bestGate.estimatedEntryTime,
      reason: `Best entry for your designated section (${user.section}) in the ${user.currentZone} zone.`
    };
  }

  bestGate = openGates.sort((a, b) => a.estimatedEntryTime - b.estimatedEntryTime)[0];
  return {
    from: 'Outside',
    to: bestGate.name,
    pathSummary: [`Walk to the ${bestGate.zone} zone to avoid crowds.`, `Enter via ${bestGate.name}.`],
    estimatedMinutes: bestGate.estimatedEntryTime,
    reason: `Rerouted for the fastest overall entry (crowd score: ${bestGate.crowdScore}).`
  };
}

export function getShortestQueue(type: QueueStatus['type'], userZone: VenueZoneId, queues: QueueStatus[]): RouteRecommendation {
  const activeQueues = queues.filter(q => q.type === type);
  if (activeQueues.length === 0) return { from: userZone, to: 'N/A', pathSummary: [], estimatedMinutes: 0, reason: `No ${type} available.` };

  const localQueues = activeQueues.filter(q => q.zone === userZone).sort((a, b) => a.estimatedWait - b.estimatedWait);
  
  if (localQueues.length > 0) {
    const bestLocal = localQueues[0];
    return {
      from: userZone,
      to: `${type} in ${bestLocal.zone}`,
      pathSummary: [`Stay in the ${userZone} zone.`, `Proceed to the nearest open ${type.toLowerCase()}.`],
      estimatedMinutes: bestLocal.estimatedWait,
      reason: `Shortest wait time (${bestLocal.estimatedWait}m) near your seat.`
    };
  }

  const bestGlobal = activeQueues.sort((a, b) => a.estimatedWait - b.estimatedWait)[0];
  return {
    from: userZone,
    to: `${type} in ${bestGlobal.zone}`,
    pathSummary: [`Leave the ${userZone} zone.`, `Walk to the ${bestGlobal.zone} zone ${type}.`],
    estimatedMinutes: bestGlobal.estimatedWait + 6,
    reason: `Fastest ${type} in the venue, worth the walk.`
  };
}
