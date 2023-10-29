export const debounce = function (cb: Function, duration: number) {
  let timer: number | undefined;
  return function (...args: any) {
    clearTimeout(timer);
    setTimeout(() => {
      cb(...args);
    }, duration);
  };
};
