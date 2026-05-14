import { Router } from "express";
import * as Controller from "../controllers/auth.controllers.js"


const router = Router()

router.post("/register", Controller.registerController)
router.post("/login", Controller.loginController)
router.put("/change-password", Controller.changePasswordController)
router.get("/employe", Controller.allEmployeeController)
router.post("/add_emp", Controller.addNewEmployController)
router.get("/viewEmp/:id", Controller.viewParticularEmployeeController)
router.post("/editEmp/:id", Controller.editEmployeController)
router.post("/create_venues", Controller.createVenueController)
router.post("/create_courts", Controller.createCourtController)
router.get("/view_venues", Controller.viewVenuesController)
router.get("/view_Pvenue/:id", Controller.viewParticluarVenueController)
router.put("/update_Pvenue/:id", Controller.updateParticularVenuecontroller)
router.put("/AddEmpVenue/:id", Controller.AddEmpOfVenueController)
router.put("/editFacilities/:id", Controller.editFacilitesController)
router.get("/viewCourt/:id", Controller.view_PcourtController)
router.put("/editCourt/:id", Controller.editCourtController)
router.put("/removeEmp/:id", Controller.removeEmpController)
router.get("/viewAllUser", Controller.viewAllUsersController)
router.get("/viewUser/:id", Controller.viewPUserController)
router.get("/Timing/:id", Controller.TimingController)
router.put("/updateTiming/:id", Controller.updateTimingController)
router.post("/matchCreation", Controller.makeAMatchController)
router.get("/viewMatches", Controller.viewMatchesServiceController)
router.get("/viewPMatch/:id", Controller.viewPMatchController)
router.post("/create-checkout-session", Controller.createCheckoutSession);
router.post("/updateMatch/:id", Controller.updatePaymentOfMatchController);
router.put("/joinMatchAfterPayment", Controller.joinMatchAfterPaymentController);
router.get("/dashboard-stats", Controller.getDashboardStatsController);



export default router

