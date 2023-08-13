export const performanceUtils = {
  startMeasure: function(name) {
    performance.mark(`${name}-start`);
  },

  endMeasure: function(name) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    const measure = performance.getEntriesByName(name, 'measure')[0];
    console.log(`${name}: ${measure.duration.toFixed(2)}ms`);
    performance.clearMarks(`${name}-start`);
    performance.clearMarks(`${name}-end`);
    performance.clearMeasures(name);
  }
};
