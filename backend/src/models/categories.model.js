module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        name: { type: String, trim: true },
    }, { timestamps: false });

    return mongoose.model("categories", schema);
};