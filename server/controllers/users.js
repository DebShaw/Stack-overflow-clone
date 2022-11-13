import User from '../models/auth.js'
import mongoose from 'mongoose';
export const getAllUsers = async (req,res) => {
    try {
        const allUsers = await User.find();
        const allUserDetails = []
        allUsers.forEach(user => {
            allUserDetails.push({_id: user._id, name: user.name, about: user.about, tags: user.tags, joinedOn: user.joinedOn})
        })
        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
export const updateProfile = async (req,res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send("User unavailiable ....")
    }
    try {
        const updatedProfile = await User.findByIdAndUpdate( _id , { $set: { 'name': name, 'about': about, 'tags': tags }}, {new: true} )
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({message: error.message})
    }
}