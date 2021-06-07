import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { datatype } from 'faker';
import { randomNumber, splitByCommaAndConvertToNumber } from 'shared';
import type { Querystring, TransformedQuerystring } from 'types';

dayjs.extend(customParseFormat);

export const transformQuerystring = ({
  ids,
  user_ids,
  from,
  to,
  ...querystringRest
}: Querystring): TransformedQuerystring => ({
  ids: ids
    ? splitByCommaAndConvertToNumber(ids)
    : datatype.array(randomNumber({ max: 100 })).filter((id): id is number => typeof id === 'number'),
  user_ids: user_ids ? splitByCommaAndConvertToNumber(user_ids) : undefined,
  from: dayjs(from, 'YYYY-MM-DD', true).isValid() ? dayjs(from, 'YYYY-MM-DD').toDate() : undefined,
  to: dayjs(to, 'YYYY-MM-DD', true).isValid() ? dayjs(to, 'YYYY-MM-DD').toDate() : undefined,
  ...querystringRest,
});
