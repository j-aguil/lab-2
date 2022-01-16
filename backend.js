const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 5000;

const users = {
    users_list : 
    [
        {
            id: 'xyz789',
            name: 'Charlie',
            job: 'Janitor',
        },
        {
            id: 'abc123',
            name: 'Mac',
            job: 'Bouncer',
        },
        {
            id: 'ppp222',
            name: 'Mac',
            job: 'Professor',
        },
        {
            id: 'yat999',
            name: 'Dee',
            job: 'Aspiring actress',
        },
        {
            id: 'zap555',
            name: 'Dennis',
            job: 'Bartender',
        },
    ]
}

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });

app.get('/users', (req, res) => {
    res.send(users);
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});