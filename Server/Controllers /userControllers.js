import { nodeMailer } from "../Helpers/noddeMailer.js";
import { jwtVerify } from "../Middleware/Jwt.js";
import { jwtSign } from "../Middleware/Jwt.js";
import { userModel } from "../Model/UserModels/User.js";
import bcrypt from "bcrypt";
import otpGen from "otp-generator";

export const signup = async (req, res) => {
  const { name, email, number, password, cpassword, image } = req.body;
  let npassword = await bcrypt.hash(password, 10);
  try {
    let verifyMail = await userModel.findOne({ email });
    if (!verifyMail) {
      const newUser = new userModel({
        name,
        email,
        number,
        password: npassword,
        cpassword,
        image,
      });
      await newUser.save();
      res.status(200).json(true);
      return;
    } else {
      res.status(201).json(false);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let verifyMail = await userModel.findOne({ email });
    if (!verifyMail) {
      res.status(200).json(false);
      return;
    } else {
      let result = await bcrypt.compare(password, verifyMail.password);
      if (result) {
        const token = await jwtSign(verifyMail._id, verifyMail.name);
        res
          .status(200)
          .cookie("token", token, {
            sameSite: "none",
            httpOnly: true,
            secure: true,
            path: "/",
          })
          .json({
            data: {
              userId: verifyMail._id,
              name: verifyMail.name,
              image: verifyMail?.image,
            },
            error: false,
          });
        return;
      }
      res.status(200).json({
        data: false,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const allUsers = async (req, res) => {
  let name = req.query.search || "";
  console.log(name);
  try {
    const newData = [];
    const data = await userModel.find({ name: new RegExp(name, "i") });
    data.forEach((value) => {
      let user = {
        userId: value._id,
        name: value.name,
        image: value.image,
      };
      newData.push(user);
    });
    res.json({ data: newData, error: false });
  } catch (error) {
    res.status(500).json({ data: false, error: true });
  }
};

export const allUserData = async (req, res) => {
  const { allUsers } = req.body;
  let ids = [];
  try {
    const token = await req.cookies?.token;
    const data = await jwtVerify(token);
    allUsers.forEach((val) => {
      ids.push(...val.members);
    });
    let newIds = new Set(ids);
    newIds.delete(data?.userId);
    let updatedIds = Array.from(newIds);
    const result = await userModel
      .find({ _id: { $in: updatedIds } })
      .select("-password -cpassword");
    res.json({ data: result, error: false });
  } catch (error) {
    res.status(500).json({ data: false, error: true });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const token = await req.cookies.token;
    const result = await jwtVerify(token);
    const data = await userModel.findOne({ _id: result?.userId });
    if (!data) {
      res.status(500).json(false);
      return;
    } else {
      res.status(200).json(true);
      return;
    }
  } catch (error) {
    res.status(500).json(false);
  }
};
export const userDetails = async (req, res) => {
  try {
    const token = await req.cookies.token;
    const result = await jwtVerify(token);
    const data = await userModel
      .findOne({ _id: result?.userId })
      .select("-password -cpassword -number");
    if (!data) {
      res.status(500).json({ data: false, error: true });
      return;
    } else {
      res.status(200).json({ data: data, error: false });
      return;
    }
  } catch (error) {
    res.status(500).json({ data: false, error: true });
  }
};
export const verifyOtp = async (req, res) => {
  try {
    let otp = otpGen.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp);
    nodeMailer(otp, req.body.mail);

    res.status(200).json({ data: otp, error: false });
  } catch (error) {
    res.status(500).json({ data: false, error: true });
  }
};
export const userUpdate = async (req, res) => {
  const { userId, name } = req.body;
  try {
    await userModel.updateOne(
      { _id: userId },
      {
        $set: {
          name: name,
          image: req.file.filename,
        },
      }
    );

    res.status(200).json({ data: true, error: false });
  } catch (error) {
    res.status(500).json({ data: false, error: true });
  }
};
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      sameSite: "none",
      httpOnly: true,
      secure: true,
      path: "/",
    });
    res.status(200).json({ data: true, error: false });
  } catch (error) {
    res.status(500).json({ data: false, error: true });
  }
};
