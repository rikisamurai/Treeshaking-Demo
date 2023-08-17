import { cloneDeep } from 'lodash';

export default function printMe() {
  console.log('I get called from print.js!');
  console.info(cloneDeep('a'));

  return <div>Print Me</div>;
}
