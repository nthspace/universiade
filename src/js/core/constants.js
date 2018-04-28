const DEBUG = process.env.NODE_ENV !== 'production';
export const GA_EVENT_CATEGORY = {
  filter: '篩選器',
  purchase: '購買',
};

export const GA_FILTER_ACTION = {
  sport: '運動',
  date: '日期',
  arena: '場館',
  activity: '活動',
};

export default { DEBUG, GA_EVENT_CATEGORY, GA_FILTER_ACTION };
