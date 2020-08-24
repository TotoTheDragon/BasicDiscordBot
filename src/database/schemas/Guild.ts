import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";

export interface IGuildSettings extends Document {
    prefix: string;
    cmdLevels: Map<string, number>;
    roleLevels: Map<string, number>;
}

const SettingsSchema: Schema = new Schema(
    {
        prefix: { type: String, required: true, default: "!" },
        cmdLevels: { type: Map, required: true, default: new Map() },
        roleLevels: { type: Map, required: true, default: new Map() }
    },
    {
        _id: false,
        id: false,
        versionKey: false,
        strict: true
    }
)

export interface IGuild extends Document {
    _id: string;
    settings: IGuildSettings;
}


const GuildSchema: Schema = new Schema(
    {
        _id: { type: String, required: true },
        settings: { type: SettingsSchema, required: true, default: () => ({}) }
    },
    {
        versionKey: false,
        strict: true
    });

export default mongoose.model<IGuild>("guild", GuildSchema);