module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        username: { type: String, trim: true },
        name: { type: String, trim: true },
        role: { type: String, trim: true },
        password: { type: String, trim: true, default: "1" },
        disabled: { type: Boolean, default: false },
        expired: { type: Boolean, default: true },
    }, { timestamps: false });

    return mongoose.model("users", schema);
};