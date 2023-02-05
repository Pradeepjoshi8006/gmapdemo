export const setLoginStatus = params => ({
  type: 'IS_LOGGEDIN',
  payload: {
    isLoggedIn: params.isLoggedIn,
  },
});

export const topHeadlineRequest = params => ({
  type: 'API_REQUEST',
  payload: {
    page: params.page,
  },
});
