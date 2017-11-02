const add = (a, b) => a + b;
const generateGreeting = (name) => `Hello ${name}!`;

test('should add two numbers', () => {
    const result = add(1, 3);

    expect(result).toBe(4);
});

test('should generate greeting', () => {
    const expected = 'Hello Dave!';
    const result = generateGreeting('Dave');

    expect(result).toBe(expected);
}); 