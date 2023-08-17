import { KeyButton } from '../shared/component/key-button';
import { performanceUtils } from '../shared/utils';
import MutationObserver from '../shared/component/mutation-observer';
import { MutationSingleElement } from '../shared/component/mutation-observer/single-element';

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
      {/* ----Mutation---- */}
      <MutationObserver />
      <MutationSingleElement />
    </div>
  );
}
