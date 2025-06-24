
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
import { controllersRouter } from "../utils/helpers";

const controllerObjects = [
    new UserController(),
    new CartController(),
    new CategoryController(),
    new MenuController(),
    new OrderController(),
    new PermissionController(),
    new PostController(),
    new ProductController(),
    new ReviewController(),
    new RoleController(),
    new SettingController(),
    new UserAddressController(),
    new UserCartController(),
    new UserOrderController(),
    new UserPaymentController(),
    new UserReviewController(),
    new UserRoleController(),
    new UserWishlistController()
]
// const userController = new UserController();
// userController.registerRoutes(router);

export default controllersRouter(controllerObjects);