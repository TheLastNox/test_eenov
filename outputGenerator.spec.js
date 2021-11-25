const { generateOutput } = require('./outputGenerator');

test('generatedOutput should be equal to output', () => {
    const generatedOutput = generateOutput(5, 1);
    const output = {
        user: { 
            id: 5,
            total_points: 78,
            loyalty_cards: [ 
                { id: 1, name: 'Carrefour', points: 12 },
                { id: 3, name: 'MacDo', points: 66 }
            ]
        },
        loyalty_card: { 
            id: 1,
            name: 'Carrefour',
            points: 56
        }
    };
    expect(generatedOutput).toEqual(output);
});