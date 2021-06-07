import { datatype, date, company, commerce, finance } from 'faker';
import dayjs from 'dayjs';
import type { Querystring, Shift } from 'types';
import { getRandomDate, randomArrayMember, randomNumber } from 'shared';
import { transformQuerystring } from 'data/transform-querystring';

export const generateData = (query: Querystring): Promise<Shift[]> => {
  const { ids, user_ids, from, to } = transformQuerystring(query);
  return Promise.resolve<Shift[]>(
    ids.map((id) => {
      const shiftStart = from && to ? getRandomDate(from, to) : date.recent(randomNumber({ max: 1000 }));
      const shiftFinish = dayjs(shiftStart).add(randomNumber({ min: 6, max: 12 }), 'hours');
      const shiftLength = shiftFinish.diff(shiftStart, 'hours');
      const breaks = datatype.array(randomNumber({ max: 4 }));
      const allowances = datatype.array(randomNumber({ max: 5 }));
      const approved_by = datatype.boolean() && randomNumber({ max: 100_000 });
      const award_interpretations = datatype.array(randomNumber({ max: 2 }));
      return {
        id,
        timesheet_id: randomNumber(),
        user_id: user_ids ? randomArrayMember(user_ids) : randomNumber(),
        date: dayjs(shiftStart).format('YYYY-MM-DD'),
        start: dayjs(shiftStart).unix(),
        ...(breaks.length > 0 && {
          breaks: breaks.map(() => {
            const breakStart = dayjs(shiftStart).add(randomNumber({ min: 1, max: shiftLength - 1 }), 'hours');
            const breakFinish = breakStart.add(randomNumber({ min: 10, max: 30 }), 'minutes');
            return {
              id: randomNumber(),
              shift_id: id,
              start: dayjs(breakStart).unix(),
              finish: dayjs(breakFinish).unix(),
              length: breakFinish.diff(breakStart, 'minutes'),
              paid: datatype.boolean(),
              updated_at: dayjs(shiftStart)
                .add(randomNumber({ max: 30 }), 'days')
                .unix(),
            };
          }),
        }),
        finish: shiftFinish.unix(),
        department_id: randomNumber({ max: 10_000 }),
        status: datatype.boolean() ? 'PENDING' : 'COMPLETED',
        ...(datatype.boolean() && { metadata: company.bs() }),
        ...(datatype.boolean() && { leave_request_id: randomNumber({ max: 100_000 }) }),
        ...(allowances.length > 0 && {
          allowances: allowances.map(() => ({
            id: randomNumber({ max: 10_000 }),
            name: company.catchPhraseNoun(),
            value: Number.parseFloat(finance.amount()),
            updated_at: randomNumber(),
            cost: Number.parseFloat(finance.amount()),
          })),
        }),
        ...(datatype.boolean() && { shift_feedback_id: randomNumber() }),
        ...(approved_by && { approved_by }),
        ...(approved_by && {
          approved_at: dayjs(shiftFinish)
            .add(randomNumber({ max: 30 }), 'days')
            .unix(),
        }),
        ...(award_interpretations.length > 0 && {
          award_interpretation: award_interpretations.map(() => ({
            units: Number.parseFloat(finance.amount()),
            date: dayjs(shiftFinish)
              .add(randomNumber({ max: 30 }), 'days')
              .format('YYYY-MM-DD'),
            export_name: commerce.productName(),
            secondary_export_name: commerce.productDescription(),
            ordinary_hours: true,
            cost: Number.parseFloat(finance.amount()),
            from: dayjs(shiftFinish)
              .add(randomNumber({ min: 30, max: 120 }), 'days')
              .unix(),
            to: dayjs(shiftFinish)
              .add(randomNumber({ min: 30, max: 120 }), 'days')
              .unix(),
          })),
        }),
        cost: Number.parseFloat(finance.amount()),
        cost_breakdown: {
          award_cost: Number.parseFloat(finance.amount()),
          allowance_cost: Number.parseFloat(finance.amount()),
        },
        updated_at: dayjs(shiftFinish)
          .add(randomNumber({ max: 90 }), 'days')
          .unix(),
        record_id: randomNumber(),
        last_costed_at: dayjs(shiftFinish)
          .add(randomNumber({ max: 120 }), 'days')
          .unix(),
      };
    }),
  );
};
