import asyncHandler from "express-async-handler";
import  Chat from "../models/chatModel.js";

export const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    // Logic to access or create chat goes here.
    let chat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-password").populate({
        path: "latestMessage", 
        populate: { path: "sender", select: "name email pic" }
    });

    if(chat.length > 0){
        res.send(chat[0]);
    } else{
        // Create new chat
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})

export const fetchChats = asyncHandler(async (req, res) => {
   const result =  await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
   .populate("users", "-password").
   populate("groupAdmin", "-password")
   .populate({'path': 'latestMessage', populate: { path: 'sender', select: 'name pic email' }})
   .sort({ updatedAt: -1 });
   res.status(200).send(result);
});

export const createGroupChat = asyncHandler(async (req, res) => {
    if(!req.body.users || !req.body.name){
        return res.status(400).send({ message: "Please Fill all the fields" });
    }

    let users = JSON.parse(req.body.users);

    if(users.length < 2){
        return res.status(400).send("More than 2 users are required to form a group chat");
    }

    // Add the logged in user to the users array
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });
        
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export const renameGroup = asyncHandler(async (req, res) => {
    const {chatId, chatName} = req.body;
    if(!chatId || !chatName){
        res.status(400);
        throw new Error("Please provide all the required fields");
    }
    const updatedChat = await Chat.findByIdAndUpdate(chatId, {chatName}, {new: true}).populate("users", "-password").populate("groupAdmin", "-password");
    if(!updatedChat){
        res.status(404);
        throw new Error("Chat Not Found");
    } else{
        res.status(200).json(updatedChat);
    }
});

export const addToGroup = asyncHandler(async (req, res) => {
    const {chatId, userId} = req?.body;
    if(!chatId || !userId){
        res.status(400);
        throw new Error("Please provide all the required fields");
    }
    const added = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
    if(!added){
        res.status(404);
        throw new Error("Chat Not Found");
    } else{
        res.status(200).json(added);
    }
});

export const removeFromGroup = asyncHandler(async (req, res) => {
    const {chatId, userId} = req.body;
    if(!chatId || !userId){
        res.status(400);
        throw new Error("Please provide all the required fields");
    }
    const removed = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
    if(!removed){
        res.status(404);
        throw new Error("Chat Not Found");
    } else{
        res.status(200).json(removed);
    }
});