import express from "express";
import { BookRoutes } from "../modules/books/books.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ReviewRoutes } from "../modules/reviews/reviews.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/book",
    route: BookRoutes,
  },
  {
    path: "/users",
    route: AuthRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
