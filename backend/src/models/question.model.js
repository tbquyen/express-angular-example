module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        categoryId: { type: String, trim: true },
        question: { type: String, trim: true },
        ans: { type: String, trim: true, default: "A" },
        ans1: { type: String, trim: true },
        ans2: { type: String, trim: true },
        ans3: { type: String, trim: true },
        ans4: { type: String, trim: true },
        explanation: { type: String, trim: true },
        duration: { type: Number, default: 30 },
    }, { timestamps: false });

    return mongoose.model("questions", schema);
};