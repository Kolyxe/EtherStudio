import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Kolyxe';
  greetUser(name);
  console.log('Update test 2');
});
