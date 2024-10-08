import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { paymentRoutes } from "../modules/payment/payment.route";
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
  {
    path: "/payment",
    route: paymentRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
