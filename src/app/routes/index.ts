import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { postRoutes } from "../modules/post/post.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/posts",
    route: postRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
