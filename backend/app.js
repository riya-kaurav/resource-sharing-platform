import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import ApiError from "./utils/ApiError.js";
import ApiResponse from "./utils/ApiResponse.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import resourceRoutes from "./routes/resource.routes.js";
import upvoteRoutes from "./routes/upvote.routes.js";

const app = express();

// Global Middlewares

// CORS
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN || "*",
//     credentials: true
//   })
// );


app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true
  })
);

// body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// cookies
app.use(cookieParser());

// Health Check

app.get("/health", (req, res) => {
  res.json(new ApiResponse(200, null, "Server is healthy"));
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/resources", resourceRoutes);
app.use("/api/v1/upvotes", upvoteRoutes);

// 404 Handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

// Global Error Handler

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json(
    new ApiResponse(
      statusCode,
      null,
      message,
      err?.errors || []
    )
  );
});

export default app;
