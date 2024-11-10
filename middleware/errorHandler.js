const errorHandler = (res, error) => {
  console.error("Error Handler:", error);
  res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;