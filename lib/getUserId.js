import mongoose from "mongoose";

export function getUserIdFromRequest(req){
    const userId = req.headers.get("x-user-id");

    if(!userId){
        throw new Error("User not authenticated");
    }

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("Invalid user id");
    }

    return userId;
}