import { Router } from "express";
import { UserController } from "../controllers/api/UserController";
import { CartController } from "../controllers/api/CartController";
import { CategoryController } from "../controllers/api/CategoryController";
import { MenuController } from "../controllers/api/MenuController";
import { OrderController } from "../controllers/api/OrderController";
import { PermissionController } from "../controllers/api/PermissionController";
import { PostController } from "../controllers/api/PostController";
import { ProductController } from "../controllers/api/ProductController";
import { ReviewController } from "../controllers/api/ReviewController";
import { UserCartController } from "../controllers/api/USerCartController";
import { RoleController } from "../controllers/api/RoleController";
import { SettingController } from "../controllers/api/SettingController";
import { UserAddressController } from "../controllers/api/UserAddressController";
import { UserOrderController } from "../controllers/api/UserOrderController";
import { UserPaymentController } from "../controllers/api/UserPaymentController";
import { UserReviewController } from "../controllers/api/UserReviewController";
import { UserRoleController } from "../controllers/api/UserRoleController";
import { UserWishlistController } from "../controllers/api/UserWishlistController";


const route = Router();

const userController = new UserController();
userController.registerRoutes(route);

// route.use('/users', new UserController());

route.use('/carts', new CartController());
route.use('/categories', new CategoryController());  
route.use('/menus', new MenuController());
route.use('/orders', new OrderController());
route.use('/permissions', new PermissionController());
route.use('/posts', new PostController());
route.use('/products', new ProductController());
route.use('/reviews', new ReviewController());
route.use('/roles', new RoleController());
route.use('/settings', new SettingController());
route.use('/user_addresses', new UserAddressController());  
route.use('/user_carts', new UserCartController());
route.use('/user_orders', new UserOrderController());
route.use('/user_payments', new UserPaymentController());
route.use('/user_reviews', new UserReviewController());
route.use('/user_Roles', new UserRoleController());
route.use('/user_wishlists', new UserWishlistController());

export default route;