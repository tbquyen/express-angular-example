module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      categories: { type: String },
      question: { type: String },
      ans: { type: String, default: "A" },
      ans1: { type: String },
      ans2: { type: String },
      ans3: { type: String },
      ans4: { type: String },
      explanation: { type: String },
      duration: { type: Number },
    },
    { timestamps: false }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("questions", schema);
};
