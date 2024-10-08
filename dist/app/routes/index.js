"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const payment_route_1 = require("../modules/payment/payment.route");
const post_route_1 = require("../modules/post/post.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/posts",
        route: post_route_1.postRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.paymentRoutes,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
