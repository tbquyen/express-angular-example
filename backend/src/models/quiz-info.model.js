module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        quizId: { type: String, trim: true },
        questionId: { type: String, trim: true },
        answer: { type: String },
        result: { type: String },
    }, { timestamps: false });

    return mongoose.model("quiz-info", schema);
};