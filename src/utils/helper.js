export const processSearchQuery = search => {
  const params = [];

  search
    .slice(1)
    .split('&')
    .map(p => {
      const [key, value] = p.split('=');
      params[key] = value;
    });

  return params;
};