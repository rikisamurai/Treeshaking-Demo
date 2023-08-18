// import { cloneDeep } from 'lodash';

export default function printMe() {
  console.log('I get called from print.js!');
  // console.info(cloneDeep('a'));

  return <div>Print Me</div>;
}
const arrayLike = {
  length: 3,
  unrelated: 'foo',
  0: 5,
  2: 4,
  3: 3, // ignored by with() since length is 3
};
console.log(Array.prototype.with.call(arrayLike, 0, 1));
// [ 1, undefined, 4 ]
