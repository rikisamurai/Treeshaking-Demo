import { KeyButton } from '../shared/component/key-button';

// eslint-disable-next-line no-unused-vars
const { testA } = await import('./dynamic-test/test-a');

export default function App() {
  return (
    <div>
      <h1>Tree Shaking</h1>
      <KeyButton />
      {/*<MainButton />*/}
    </div>
  );
}
