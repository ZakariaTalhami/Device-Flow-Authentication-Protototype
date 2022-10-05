export const loopingFunction = async <T = any>(cb: () => Promise<T | null>, hasCompleted: () => boolean, interval: number) => {
  return new Promise<T | null>((resolve, reject) => {
    setTimeout(async function a() {
        const result  = await cb();
    
        if (!hasCompleted()) {
          setTimeout(a, interval);
        } else {
          resolve(result);
        }
      }, interval);
  })
};
