const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    description: String,
    status: {
      type: String,
      default: "in progress",
    },
    important: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
const Tasks = mongoose.model("task", taskSchema);

export default Tasks;
