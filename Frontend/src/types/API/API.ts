import { ApiFields, ApiField } from "./fields";
import { ApiRecord } from "./records";
import { ApiTypes } from "./types";

export interface IApi {
  getFields: ()=>Promise<ApiFields>;
  getRecord: (id: string)=> Promise<ApiRecord>;
  getTypes: () => Promise<ApiTypes>;
  postField: (field: ApiField) => Promise<unknown>;
  postRecord: (post: ApiRecord) => Promise<unknown>;
  deleteField: (id: string) => Promise<unknown>;
  deleteRecord: (id: string) => Promise<unknown>;
  putRecord: (id: string, record: ApiRecord) => Promise<unknown>;
}