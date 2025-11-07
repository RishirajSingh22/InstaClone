import User from "../models/user.model.js";

const findAll = async () => User.find();
const findByEmail = async (email) => User.findOne({ email });
const createUser = async (data) => User.create(data);

export default {
  findAll,
  findByEmail,
  createUser
};
