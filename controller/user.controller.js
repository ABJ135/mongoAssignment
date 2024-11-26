const user = require("../models/user.models");

const createUser = async (req, res) => {
  const data = req.body;
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
    const object = await user.findById(id).populate("bookId");
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
  
    try
  {const obj = await user.findById(userId)


  if(!obj){
      return res.status(400).json("user not found")
  }

  if(obj.borrowedBook.length === 3){
    return  res.status(400).json("user cannot borrow more books")
  }

  if (obj.borrowedBook.includes(bookId)) {
      return res.status(400).json("Book already borrowed");
  }

  obj.borrowedBook.push(bookId);

  await obj.save();

  res.status(200).json("Book borrowed successfully")}
  catch(error){
    res.status(500).json(error)
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  borrow,
};
