export const perfNaviTracker = (startMark, endMark, metricName) => {
  // Check if startMark and endMark are properties of Navigation Timing
  const startIsNavTiming = Boolean(performance.timing[startMark]);
  const endIsNavTiming = Boolean(performance.timing[endMark]);

  // If neither startMark nor endMark are Navigation Timing properties, they must be performance.mark points
  if (
    !startIsNavTiming &&
    !performance.getEntriesByName(startMark, 'mark').length
  ) {
    console.warn(`Start mark "${startMark}" not found.`);
    return;
  }

  if (
    !endIsNavTiming &&
    !performance.getEntriesByName(endMark, 'mark').length
  ) {
    console.warn(`End mark "${endMark}" not found.`);
    return;
  }

  // Measure
  performance.measure(metricName, startMark, endMark);
  const measure = performance.getEntriesByName(metricName, 'measure')[0];
  const value = measure ? measure.duration : null;

  // Clear
  performance.clearMeasures(metricName);

  // Report
  if (value === undefined || value === null) {
    return;
  }
  console.info(metricName, value);
};
