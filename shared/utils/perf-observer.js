export const performanceUtils = {
  observer: new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure') {
        console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
        console.log('entry', entry);
      }
    }
  }),

  startMeasure: function (name) {
    performance.mark(`${name}-start`);
  },

  endMeasure: function (name) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    performance.clearMarks(`${name}-start`);
    performance.clearMarks(`${name}-end`);
  },

  disconnect: function () {
    this.observer.disconnect();
  },
};

performanceUtils.observer.observe({ entryTypes: ['measure'] });

// // 使用示例
// performanceUtils.startMeasure('myTask');
// // 执行一些耗时的操作
// performanceUtils.endMeasure('myTask');

// 当不再需要观察性能条目时，调用 disconnect
// performanceUtils.disconnect();
