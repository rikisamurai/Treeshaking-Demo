/**
 * 自定义区间perf打点和上报
 */
export const performanceUtils = {
  startMeasure: function (name) {
    performance.mark(`${name}-start`);
  },

  endMeasure: function (name) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    const measure = performance.getEntriesByName(name, 'measure')[0];
    const value = measure.duration.toFixed(2);
    // report
    console.log(`${name}: ${value}ms`);
    sendPerfMetricToSlardar(name, value);
    sendPerfMetricForTea(name, value);
    // clear
    performance.clearMarks(`${name}-start`);
    performance.clearMarks(`${name}-end`);
    performance.clearMeasures(name);
  },
};

export const sendPerfMetricToSlardar = (name, value) => {
  console.info('slardar', name, value);
};

export const sendPerfMetricForTea = (name, value) => {
  console.info('tea', name, value);
};
performance.timing