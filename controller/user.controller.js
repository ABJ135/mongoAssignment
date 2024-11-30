const user = require("../models/user.models");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const data = req.body;
  let pass = data.password;

  pass = await bcrypt.hash(pass, 10);
  data.password = pass;
  const object = await user.create(data);
  res.json({ message: "Object created Successfully", object });
};

const getAllUsers = async (req, res) => {
  const object = await user.find({});
  res.json(object);
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const object = await user.findById(id);
    res.json(object);
  } catch (error) {
    console.log(error);
    res.send("Error finding user");
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const object = await user.findByIdAndUpdate(id, data);

  res.json(object);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await user.deleteOne(id);
};

const borrow = async (req, res) => {
  const userId = req.params.Id;
  const bookId = req.params.bookId;

  try {
    const obj = await user.findById(userId);

    if (!obj) {
      return res.status(400).json("user not found");
    }

    if (obj.borrowedBook.length === 3) {
      return res.status(400).json("user cannot borrow more books");
    }

    if (obj.borrowedBook.includes(bookId)) {
      return res.status(400).json("Book already borrowed");
    }

    obj.borrowedBook.push(bookId);

    await obj.save();

    res.status(200).json("Book borrowed successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const returnBook = async (req, res) => {
  const userId = req.params.id;
  const bookId = req.params.bookId;
  console.log(userId, "userid", bookId, "bookId");

  try {
    const obj = await user.findById(userId);

    if (!obj) {
      res.status(400).json("user not found");
    }

    if (obj.borrowedBook.length === 0) {
      res.status(400).json("user has not borrowed any book");
    }

    const index = obj.borrowedBook.findIndex(
      (book) => book.toString() === bookId
    );
    obj.borrowedBook.splice(index, 1);

    await obj.save();
    res.status(200).json("Book removed successfully");
  } catch (error) {
    res.status(500).json(error, "can not return book");
  }
};

const borrowedBooks = async (req, res) => {
  try {
    const id = req.params.id;
    const object = await user.findById(id).populate("borrowedBook");
    res.json(object);
  } catch (error) {
    console.log(error);
    res.send("Error finding user");
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const email = await user.findOne({ email: req.body.email });

    if (email && validate(req.body.password,email.password)) {
      res.status(200).json("Login Successfull");
    } else {
      res.status(500).json("wrong Credentials");
    }
  } catch (error) {
    console.log(error)
    res.status(500).json("Error");
    
  }
  
};
const validate = async (plainPass,hash) => {
  const v = await bcrypt.compare(plainPass, hash);
  return v;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  borrow,
  returnBook,
  borrowedBooks,
  login,
};
