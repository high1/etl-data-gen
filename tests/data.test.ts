import test from 'tape';
import { generateData } from '../src/data';
import { datatype } from 'faker';
import { randomNumber } from '../src/shared';

test('Random number default should be less or equal to one million', (t) => {
  t.true(randomNumber() <= 1_000_000);
  t.end();
});

test('Random number default should be greater or equal to min and less than or equal to max', (t) => {
  const min = 10,
    max = 100;
  const rnd = randomNumber({ min, max });
  t.true(rnd >= min && rnd <= max);
  t.end();
});

test('Data generator returns given ids', async function (t) {
  const ids = datatype.array(randomNumber({ max: 1000 })).filter((id): id is number => typeof id === 'number');
  const generated = await generateData({ ids: ids.join(',') });
  t.deepEqual(
    generated.map(({ id }) => id),
    ids,
  );
});
