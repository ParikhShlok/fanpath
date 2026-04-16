import { GateStatus, UserContext, QueueStatus, RouteRecommendation, VenueZone } from './types';

// Returns the best gate for a user based on location and wait times.
export function getBestGate(user: UserContext, gates: GateStatus[]): RouteRecommendation {
  let bestGate: GateStatus | null = null;
  
  if (user.needsAccessibility) {
    // If accessibility is needed, strongly prefer gates matching the user's zone or with very low wait times.
    const accessibleGates = gates.filter(g => g.name.toLowerCase().includes('accessibility'));
    if (accessibleGates.length > 0) {
      bestGate = accessibleGates.sort((a, b) => a.waitTimeMinutes - b.waitTimeMinutes)[0];
      return {
        pathSteps: [`Navigate to ${bestGate.name}`],
        estimatedTimeMinutes: bestGate.waitTimeMinutes,
        reason: 'Recommended for optimal accessibility.'
      };
    }
  }

  // Filter open gates and sort by wait times
  const openGates = gates.filter(g => g.isOpen);
  if (openGates.length === 0) {
    return { pathSteps: [], estimatedTimeMinutes: 0, reason: 'All gates are currently closed.' };
  }

  // Find a balance between the user's preferred zone and wait times.
  const preferredGates = openGates.filter(g => g.zone === user.preferredZone);
  if (preferredGates.length > 0) {
    bestGate = preferredGates.sort((a, b) => a.waitTimeMinutes - b.waitTimeMinutes)[0];
    
    // Check if there is a significantly faster gate elsewhere
    const absoluteBestGate = openGates.sort((a, b) => a.waitTimeMinutes - b.waitTimeMinutes)[0];
    if (absoluteBestGate.waitTimeMinutes < bestGate.waitTimeMinutes - 10) {
       return {
         pathSteps: [`Navigate to ${absoluteBestGate.name} in the ${absoluteBestGate.zone} zone`],
         estimatedTimeMinutes: absoluteBestGate.waitTimeMinutes,
         reason: `Your preferred zone (${user.preferredZone}) is busy. This gate saves you ${bestGate.waitTimeMinutes - absoluteBestGate.waitTimeMinutes} minutes.`
       };
    }
    
    return {
      pathSteps: [`Head to ${bestGate.name}`],
      estimatedTimeMinutes: bestGate.waitTimeMinutes,
      reason: `Fastest entry in your seating zone (${user.preferredZone}).`
    };
  }

  // Fallback
  bestGate = openGates.sort((a, b) => a.waitTimeMinutes - b.waitTimeMinutes)[0];
  return {
    pathSteps: [`Head to ${bestGate.name}`],
    estimatedTimeMinutes: bestGate.waitTimeMinutes,
    reason: 'Fastest overall wait time.'
  };
}

export function getShortestQueue(type: QueueStatus['type'], userZone: VenueZone, queues: QueueStatus[]): RouteRecommendation {
  const openQueues = queues.filter(q => q.isOpen && q.type === type);
  if (openQueues.length === 0) {
    return { pathSteps: [], estimatedTimeMinutes: 0, reason: `No open ${type} locations found.` };
  }

  // Try to find one in the user's zone
  const zoneQueues = openQueues.filter(q => q.zone === userZone).sort((a, b) => a.waitTimeMinutes - b.waitTimeMinutes);
  if (zoneQueues.length > 0) {
    const bestQueue = zoneQueues[0];
    return {
      pathSteps: [`Walk down the concourse to ${bestQueue.name}`],
      estimatedTimeMinutes: bestQueue.waitTimeMinutes,
      reason: `Closest ${type} with the shortest line.`
    };
  }

  // Otherwise, closest globally
  const bestQueue = openQueues.sort((a, b) => a.waitTimeMinutes - b.waitTimeMinutes)[0];
  return {
      pathSteps: [`Navigate to the ${bestQueue.zone} zone to ${bestQueue.name}`],
      estimatedTimeMinutes: bestQueue.waitTimeMinutes + 5, // Add walk time penalty across zones
      reason: `Fastest ${type} overall (requires short walk).`
  };
}
