const debounce = (fn, delay) => {
  let clear;
  return (...args) => {
    if (clear) clearTimeout(clear);
    clear = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

export default {
  debounce,
};
