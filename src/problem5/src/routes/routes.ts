import express from "express";
import { ResourceController } from "../controller/resourceController";

//initiating the router
export const router = express.Router();

//add resource route
router.post("/", ResourceController.addResource);

//get all resources
router.get("/", ResourceController.getResources);

//get single resource
router.get("/:id", ResourceController.getSingleResource);

//update a resource
router.put("/:id", ResourceController.updateResource);

//delete a resource
router.delete("/:id", ResourceController.deleteResouce);
