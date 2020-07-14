const names: Array<string> = ['Max', 'Manuel'];
// names[0].split(' ');

// resolveされるdataの型をgenericsで指定
const promise: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

promise.then(data => {
  // data.split(' ');
});

