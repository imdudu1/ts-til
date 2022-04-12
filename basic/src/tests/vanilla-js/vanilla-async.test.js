describe('', function () {
  test('no-async-promise-executor', () => {
    // new Promise((async (resolve, reject) => {})); X
    new Promise((resolve, reject) => {});
  });

  test('no-await-in-loop', async () => {
    // for (const url of urls) {
    //   const response = await fetch(url);
    // }

    const res = [];
    for (const url of urls) {
      const r = fetch(url);
      res.push(r);
    }

    await Promise.all(res);
  });

  test('no-promise-executor-return', () => {
    // new Promise(((resolve, reject) => 10)); X
    new Promise(((resolve, reject) => resolve(10)));
  })

  test('max-nested-callbacks', async () => {
    const r1 = await fetch();
    const r2 = await fetch(r1);
    const r3 = await fetch(r2);
    await fetch(r3);
  })

  test('no-return-await', async () => {
    // return await fetch(''); X
    return fetch('');
  })

  test('try-catch-promise', async () => {
    try {
      const user = await fetch('');
      return user;
    } catch (e) {
      // Handle fetch error
    }
  })

  test('prefer-promise-reject-errors', () => {
    Promise.reject(new Error('An error occurred'));
  })
})

async function fetch() {}
