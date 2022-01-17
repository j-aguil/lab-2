const express = require('express');
const { del } = require('express/lib/application');
const app = express();
const port = 5000;

const cors = require('cors');



const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
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
       }
    ]
 }


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if(result === undefined || result.length == 0){
        res.status(404).send('resource not found.');
    }
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id){
    return users['users_list'].find( (user) => user['id'] === id); //or line below
    //return users['users_list'].filter( (user) => user['id] === id) since user id in this case is unique
} 


app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    } else if(name != undefined && job == undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    } 
    else {
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

//part 7 - second change
//-----
//gets users with given name and job
const findUserByNameAndJob = (name , job) => { 
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job); 
}
//-----


app.post('/users', (req, res) => {
    req.body.id = generateId();

    const userToAdd = req.body;
    addUser(userToAdd);
    //part 6 - #3
    //-----
    res.status(201).send(userToAdd);
    //-----
});


function addUser(user){
    users['users_list'].push(user);
}

//part 6 - #2
//generate random ID
function generateId(){
    let Id = "";

    let chars = "abcdefghijklmnopqrstuvwxyz";

    //generates the random first 3 letters
    for (let i = 0; i < 3; i++){
        Id += chars.charAt(Math.floor(Math.random() * chars.length));
    };

    //generates random 3 digit number to add onto the end of ID
    Id += Math.floor(Math.random() * (999 - 100) + 100);

    //test ID creation
    // console.log(Id);
    return Id;
}
//-----


//part 7 delete user
//------

app.delete('/users/:id', (req, res) => {

    const userToDelete = req.params['id']; //or req.params.id
    

    if(userToDelete === undefined || userToDelete.length == 0){
        res.status(404).send('resource not found.');
    }
    else {
        delUser(userToDelete);
        res.status(204).end();  //change status
    }
})

function delUser(userToDelete){
    users['users_list'] = users['users_list'].filter((user) => user['id'] !== userToDelete);
}
//------


app.get('/users', (req, res) => {
    res.send(users);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      


