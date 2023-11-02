import Resource from "../models/resourceModel";

export class resourceService {
    //create a new resource
    async createResource(data: any) {
        try {
            const newResource = await Resource.create(data);
            return newResource;
        } catch (error) {
            console.log(error);
        }
    }

    //get all resources
    async getResources() {
        try {
            const resources = await Resource.find({});
            return resources;
        } catch (error) {
            console.log(error);
        }
    }

    //get a single rescource by id
    async getResource(id: string) {
        try {
            const resource = await Resource.findById({ _id: id });
            if (!resource) {
                return "resource not available";
            }
            return resource;
        } catch (error) {
            console.log(error);
        }
    }

    //update a resource
    async updateResource(id: string, data: any) {
        try {
            //pass the id of the object you want to update
            //data is for the new body you are updating the old one with
            //new:true, so the dats being returned, is the update one
            const resourcez = await Resource.findByIdAndUpdate(
                { _id: id },
                data,
                {
                    new: true,
                }
            );
            if (!resourcez) {
                return "Resource not available";
            }
            return resourcez;
        } catch (error) {
            console.log(error);
        }
    }

    //delete a resource by using the find by id and delete
    async deleteResource(id: string) {
        try {
            const resource = await Resource.findByIdAndDelete(id);
            if (!resource) {
                return "Resource not available";
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//export the class
export const resourceServices = new resourceService();
