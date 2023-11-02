import { resourceServices } from "../services/resourceService";
import { Request, Response } from "express";
import { resourceSchemaValidate } from "../models/resourceModel";

class resourceController {
    //create resource
    addResource = async (req: Request, res: Response) => {
        try {
            //data to be saved in database
            const data = {
                title: req.body.title,
                description: req.body.description,
                published: req.body.published,
            };
            //validating the request
            const { error, value } = resourceSchemaValidate.validate(data);

            if (error) {
                res.status(500).send(error.message);
            } else {
                //call the create post function in the service and pass the data from the request
                const resource = await resourceServices.createResource(value);
                res.status(201).json(resource);
            }
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    //get all resources
    getResources = async (req: Request, res: Response) => {
        try {
            const resources = await resourceServices.getResources();
            res.status(200).send(resources);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    //get a single resource by id
    getSingleResource = async (req: Request, res: Response) => {
        try {
            //get id from the parameter
            const id = req.params.id;
            const resource = await resourceServices.getResource(id);
            resource
                ? res.status(200).send(resource)
                : res.status(404).send("Resouce not found!");
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    //update a resource
    updateResource = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const resource = await resourceServices.updateResource(
                id,
                req.body
            );
            res.status(200).json(resource);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    //delete a resource
    deleteResouce = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await resourceServices.deleteResource(id);
            res.status(204).send("Resouce deleted");
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };
}

//export class
export const ResourceController = new resourceController();
