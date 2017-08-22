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
