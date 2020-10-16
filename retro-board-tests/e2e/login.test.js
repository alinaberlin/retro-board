import { Selector } from 'testcafe'
import { username } from './helpers'


fixture`Login flow`.page`http://localhost`

test('User should login', async (t) => {
  // Starts at http://localhost/game/MSUzDCNCn
  const loginButton = Selector('span').withAttribute(
    'class',
    'MuiButton-label'
  );
  const cardInput = Selector('input').withAttribute(
    'class',
    'MuiInputBase-input MuiInput-input'
  );
  const startButton = Selector('button').withAttribute(
    'class',
    'MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary'
  );
  const welcomeUser = Selector('h1').withText(`Welcome, ${username}`);
  const createSession = Selector('button').withAttribute(
    'class',
    'MuiButtonBase-root MuiFab-root MuiFab-extended MuiFab-secondary'
  );
  const createRetrospected = Selector('.MuiSvgIcon-root').withAttribute(
    'style',
    'font-size: 0.8em;'
  );
  // start from p tag with class MuiTypography-root and
  // below is having 2 span children and inside the last span
  // the svg tag is replaced with an input box
  const inputBoxRetrospect = Selector('.MuiTypography-root')
    .child('span')
    .child('span')
    .child('input');
  const inputWentWell = Selector('input').withAttribute(
    'class',
    'MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart'
  );
  const inputEdit = Selector('span').withAttribute(
    'aria-label',
    'Post content'
  );

  const inputBoxRetrospectWell = Selector('.MuiTypography-root')
    .child('span')
    .child('span')
    .child('textarea');
  const inputAditionalFeature = Selector('button')
    .withAttribute('class', 'MuiButtonBase-root MuiButton-root MuiButton-text')
    .withAttribute('aria-label', 'Additional features');

  const inputSetAction = Selector('button')
    .withAttribute('class', 'MuiButtonBase-root MuiButton-root MuiButton-text')
    .withAttribute('aria-label', 'Set Action');


  const inputEdittableLabel = Selector('p')
    .withAttribute('class', 'MuiTypography-root MuiTypography-body1')
    .child('span')
    .child('span')
    .child('textarea');

  await t.click(loginButton);
  await t.typeText(cardInput, 'A');
  await t.click(startButton);
  await t.expect(welcomeUser.exists).ok();
  await t.click(createSession);
  await t.click(createRetrospected);
  await t.expect(inputBoxRetrospect.exists).ok();
  await t.typeText(inputBoxRetrospect, 'Retrospect Alina');
  await t.typeText(inputWentWell, 'Everything');
  await t.pressKey('enter');
  await t.setTestSpeed(0.2);
  await t.click(inputEdit);
  await t.typeText(inputBoxRetrospectWell, 'change');
  await t.pressKey('enter');
  await t.click(inputAditionalFeature);
  await t.click(inputSetAction).typeText(inputEdittableLabel, 'something');

})
