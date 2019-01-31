import IModel from "./IModel";

export default class ModelUtil {
    static arrayToJson(values: Array<IModel>){
        return values.map((value) => value.toJson());
    }
}