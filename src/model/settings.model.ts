import mongoose,{ model, Schema } from "mongoose";

interface ISetting{
    ownerId:string
    bussinessName:string
    supportEmail:string
    knowledge:string
}

const settingSchema= new Schema<ISetting>({
    ownerId:{type:String,required:true,unique:true},
    bussinessName:{type:String},
    supportEmail:{type:String},
    knowledge:{type:String}

},{timestamps:true});

const Settings=mongoose.models.Settings || model("Settings",settingSchema);

export default Settings;