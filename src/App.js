import { KeyButton } from '../shared/component/key-button';
import { performanceUtils } from '../shared/utils/perf-observer';

performanceUtils.startMeasure('dynamic');
// eslint-disable-next-line no-unused-vars
const { testA } = await import('./dynamic-test/test-a');
performanceUtils.endMeasure('dynamic');

export default function App() {
  return (
    <div>
      <h1>Tree Shaking</h1>
      <KeyButton />
      {/*<MainButton />*/}
    </div>
  );
}
