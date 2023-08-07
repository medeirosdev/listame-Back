/* eslint-disable import/prefer-default-export */
export const reccurrenceTypes = {
  NEVER: {
    id: 1,
    name: 'Nunca',
    value: null,
    timesToRepeat: null,
    repeatEvery: null,
  },
  DAILY: {
    id: 2,
    name: 'Diariamente',
    value: 'DAILY',
    timesToRepeat: 365,
    repeatEvery: 1,
  },
  WEEKLY: {
    id: 3,
    name: 'Semanalmente',
    value: 'WEEKLY',
    timesToRepeat: 52,
    repeatEvery: 7,
  },
  MONTHLY: {
    id: 4,
    name: 'Mensalmente',
    value: 'MONTHLY',
    timesToRepeat: 12,
    repeatEvery: 30,
  },
};
