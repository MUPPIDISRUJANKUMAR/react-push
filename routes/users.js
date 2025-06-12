import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [
  //   {
  //     firstName: "Jhon",
  //     lastName: "Doe",
  //     age: 25,
  //   },
  //   {
  //     firstName: "Jane",
  //     lastName: "Die",
  //     age: 22,
  //   },
];

router.get("/", (req, res) => {
  res.send(users);
  res.send("Hello");
});

router.post("/", (req, res) => {
  const user = req.body;
  const userWithId = { ...user, id: uuidv4() };
  users.push(userWithId);

  res.send(
    `User with name ${
      user.firstName + " " + user.lastName
    } added at the database`
  );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);
  res.send(`User with ${id} is deleted`);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const user = users.find((user) => user.id === id);

  if (firstName) {
    user.firstName = firstName;
  }
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;

  res.send(`User with ${id} has been updated`);
});

export default router;
