module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      userid: { type: String, trim: true },
      categoryId: { type: String, trim: true },
      numberQuestion: { type: Number },
      passed: { type: Number, default: 0 },
      timeStart: { type: Date },
      timeEnd: { type: Date },
    },
    { timestamps: false }
  );

  return mongoose.model("quiz", schema);
};
