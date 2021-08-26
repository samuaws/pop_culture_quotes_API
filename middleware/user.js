const User = require("../models/user"),
Saved = require("../models/savedQuotes");
module.exports = {
    createUser: async (req, res) => {
        const { email, username, first_Name, last_Name, password } = req.body;
        try {
            const user = await User.create({ email, username, first_Name, last_Name, password });
            user.savedQuotes = await Saved.create({user})
            console.log(user.savedQuotes)
            res.status(201).json(user.insertToken());
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    logUser: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user) throw new Error("We didn't find any user with this username : " + username);
            if (!(await user.comparePasswords(password)))
                throw Error("Wrong Password,Try again !!");
            res.status(201).json(user.insertToken());
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showUser: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User.findById(id).select({ passwords: 0 }); //.select( "-passwords" );
            res.json(user);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    updateUser: async (req, res) => {
        const { first_Name, last_Name, passwords } = req.body,
            id = req.params.id;
        try {
            if (id !== req.user._id)
                throw new Error("You aren't allowed to edit other users profiles.");
            const u = await User.findById(id);
            u.first_Name = first_Name ? first_Name : u.first_Name;
            u.last_Name = last_Name ? last_Name : u.last_Name;
            u.passwords = passwords ? passwords : u.passwords;
            await u.save();
            res.status(201).send(u);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    userToAdmin: async (req, res) => {
        const id = req.params.id;
        try {
            const u = await User.findById(id);
            u.is_Admin = true;
            await u.save();
            // add published games
            res.status(201).send(u);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id,
                u = await User.findById(id);
                console.log(u);
            if (u._id.toString() !== req.user._id.toString()){
                
                throw Error("You aren't allowed to delete other people games.");
            }
            await u.remove();
            res.json({ deleted: "successfully" });
        } catch (e) {
            res.json({ error: e.message });
        }
    },
};
