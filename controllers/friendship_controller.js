const Friendship = require("../models/friendship");
const User = require("../models/user");

module.exports.toggleFriendship = async function (req, res) {
    //  url :/friendships/toggleFriendship/:id


    try {
        let isFriends = false;
        let existingFriendship = await Friendship.findOne({
            from_user: req.user._id,
            to_user: req.params.id
        });
        let from_user = await User.findById(req.user._id).populate("friends");
        let to_user = await User.findById(req.params.id).populate("friends");
        if (existingFriendship) {
            from_user.friends.pull(existingFriendship._id);
            from_user.save();
            to_user.friends.pull(existingFriendship._id);
            to_user.save();
            existingFriendship.remove();
            isFriends = false;
        } else {
            let newFriendship = await Friendship.create({
                from_user: req.user._id,
                to_user: req.params.id
            });
            from_user.friends.push(newFriendship._id);
            from_user.save();
            to_user.friends.push(newFriendship._id);
            to_user.save();
            isFriends = true;
        }
        return res.status(200).json({
            message: "Created friends",
            data: {
                isFriends: isFriends
            }
        });
    } catch (err) {
        req.flash("error", "Error in creating the post");
        console.log(err);
    }

}