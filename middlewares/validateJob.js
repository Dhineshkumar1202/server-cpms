const validateJob = (req, res, next) => {
  const { title, description, subject } = req.body;

  if (!title || !description || !subject) {
    return res.status(400).json({ message: "Title, description, and subject are required" });
  }

  if (title.length < 5) {
    return res.status(400).json({ message: "Job title must be at least 5 characters long" });
  }

  next();
};

module.exports = validateJob;
