test('sanity 1+1', () => {
   expect(1+1).toEqual(2);
});

test('Check environment var', () => {
    console.log(process.env.NODE_ENV);
});