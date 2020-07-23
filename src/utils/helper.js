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

export const isSSR = typeof window === 'undefined';

export const randomRange = (min, max) =>
  Math.round(Math.random() * (max - min) + min);
