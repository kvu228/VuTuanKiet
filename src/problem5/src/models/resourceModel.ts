import mongoose from "mongoose";
import Joi from "joi";

//validation schema
export const resourceSchemaValidate = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    published: Joi.boolean().required(),
});

// Create Interface
interface IResource {
    title: String;
    description: String;
    published: Boolean;
}

//resourceSchema
const resourceSchema = new mongoose.Schema<IResource>(
    {
        title: String,
        description: String,
        published: Boolean,
    },
    {
        timestamps: true,
    }
);

const Resource = mongoose.model<IResource>("Resource", resourceSchema);

export default Resource;
