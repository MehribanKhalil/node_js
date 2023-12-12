var express = require('express')
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())

let users = [
  {
    id: 1,
    name: "Mehi",
    surname: "Khalilova",
  },
  {
    id: 2,
    name: "Zuzu",
    surname: "Qurbanova",
  },
  {
    id: 3,
    name: "Nazi",
    surname: "Kerimli",
  },
];
let count = 4;

//get data
app.get("/users", (req, res) => {
  res.send(users);
});

// users by id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const selectedUser = users.find((x) => x.id == id);
  res.send(selectedUser);
});

//delete
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userId = users.find((x) => x.id === +id);
  if (userId) {
    users = users.filter((x) => x.id !== +id);
    res.send(users);
    res.status(200).json({ message: "User Deleted!" });
  } else {
    res.status(404).json({ message: "User Tapilmadi!" });
  }
});

//post
app.post("/users", (req, res) => {
  //way 1
  const userObj = {
    id: count++,
    name: req.body.name,
    surname: req.body.surname,
  };
  users.push(userObj);
  res.send(users);

  //way 2
  //   users.push({id:count++,...body.name})
  //   res.send(users);
});

//put
app.put("/users/:id", (req, res) => {
  //way1
  const { id } = req.params;
  users = users.filter((x) => x.id !== +id);
  const updateUser = {
    id: +id,
    name: req.body.name,
    surname: req.body.surname,
  };
  users.push(updateUser);
  users.sort((a, b) => a.id - b.id);
  res.send(users);

  //way2
  //   const { id } = req.params;
  //   const index = users.findIndex((x) => x.id === +id);
  //   users[index] = { id: id, ...req.body };
  //   res.send(users);
});

app.get("*", (req, res) => {
  res.send("bele bir sehife yoxdur");
});

app.listen(4000, () => {
  console.log("server 4000 portunda isleyir");
});
