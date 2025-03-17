import { Router } from "express";
import { prisma } from "../config/prisma";
import { User } from "../controllers/user";
// import { ResetPassword} from "../controllers/resetPassword";
import { Article } from "../controllers/article";
// import { Practice } from "../controllers/practice";
import { Admin } from "../controllers/admin";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
// import { Form } from "../controllers/form";

const router = Router();

// write all routes here
router.get("/healthCheck", async (req, res) => {
  console.log("Health check api hit");
  const users = await prisma.user.findMany();
  res.status(200).json({
    message: "Working fine!",
  });
});

// Form Submit
// router.post('/formsubmit', Form.formSubmit);

// User Operations
router.get('/user', authMiddleware, User.userDetails);
router.post('/signup', User.register);
router.post('/user', User.login);
router.put('/user', authMiddleware, User.userUpdate);
router.delete('/user', authMiddleware, User.deleteUser);

// User data operations
// update user data where solved and unsolved questions are stored

// // Reset Password
// router.post('/resetpassword', authMiddleware, ResetPassword.resetPassword);
// router.get('/resetpassword/:token', ResetPassword.resetPasswordToken);

// Article Operations
router.get('/article/:slug', Article.getArticles);
router.get('/article/slug/:slug', Article.getArticleBySlug);
router.post('/article', adminMiddleware, Article.newArticle);
router.put('/article/:id', adminMiddleware, Article.updateArticle);
router.put('/article/parent/:slug', adminMiddleware, Article.updateParent); // change parent of the article
router.delete('/article/:id', adminMiddleware, Article.deleteArticle);
// Parent Article
router.get('/article/parentART/:slug', Article.getParentArticle);
router.post('/article/parentART', adminMiddleware, Article.newParentArticle);
router.put('/article/parentART/:slug', adminMiddleware, Article.updateParentArticle);
router.delete('/article/parentART/:slug', adminMiddleware, Article.deleteParentArticle);

// Daily, Monthly yearly article
router.get('/article/daily/:date/:type', Article.getDailyArticle);
// Post
router.post('/article/daily', adminMiddleware, Article.newDailyArticle);
// Update
router.put('/article/daily/:id', adminMiddleware, Article.updateDailyArticle);
// Delete
router.delete('/article/daily/:id', adminMiddleware, Article.deleteDailyArticle);

// Article Practice
// router.get('/practice/', authMiddleware, Practice.getPractice);
// router.post('practice/solution', authMiddleware, Practice.evaluateSolution);
// router.post('/practice', adminMiddleware, Practice.newPractice);
// router.put('/practice/:id', adminMiddleware, Practice.updatePractice);
// router.delete('/practice/:id', adminMiddleware, Practice.deletePractice);

// // Admin Operations
router.get('/admin', adminMiddleware, Admin.adminDetails);
router.post('/admin/signup', Admin.registerAdmin);
router.post('/admin', Admin.adminLogin);
// router.put('/admin', authMiddleware, Admin.adminUpdate);
// router.delete('/admin', authMiddleware, Admin.deleteAdmin);
// Admin permissions
// router.put('/admin/permission', authMiddleware, Admin.updatePermission);

export default router;