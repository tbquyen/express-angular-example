module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      username: { type: String },
      name: { type: String },
      role: { type: String },
      password: { type: String, default: "1" },
      disabled: { type: Boolean, default: false },
      expired: { type: Boolean, default: true },
    },
    { timestamps: false }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("users", schema);
};
