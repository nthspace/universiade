const dayMapping = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
};

export const isScheduleActive = (schedule) => {
  const basis = new Date();
  if (basis.getHours() > 11) {
    basis.setHours(12, 0, 0, 0);
  } else {
    basis.setHours(0, 0, 0, 0);
    basis.setHours(-12);
  }
  return ((new Date(schedule.date) - basis) / 36e5) > 35;
};

export const withDay = date => `${date}（${dayMapping[new Date(date).getDay()]}）`;

export const scrollNodeIntoView = (node, behavior = 'smooth') => {
  if (node) {
    node.scrollIntoView({ behavior });
  }
};

export const todayInitDate = () => {
  const current = new Date();

  const currentDate = current.getDate();
  const currentMonth = current.getMonth();
  const currentYear = current.getFullYear();

  return new Date(currentYear, currentMonth, currentDate);
};

const normalizeDate = (date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);

  return date;
};

export const sortSchedules = today => schedules =>
  [
    ...schedules.filter(s => !(today > normalizeDate(new Date(s.date)))),
    ...schedules.filter(s => (today > normalizeDate(new Date(s.date)))),
  ];
