import { Url } from "url";
import { IApi } from "../types/API/API";
import { ApiFields, ApiField } from "../types/API/fields";
import { ApiRecord } from "../types/API/records";
import { ApiTypes } from "../types/API/types";
import { BaseApi } from "./baseAPI";

export interface ApiUrls {
  getFieldsUrl: string;
  getRecordUrl: string;
  getTypesUrl: string;
  postFieldUrl: string;
  putFieldUrl: string;
  deleteFieldUrl: string;
  postRecordUrl: string;
  putRecordUrl: string;
  deleteRecordUrl: string;
}

export class Api extends BaseApi implements IApi{
  constructor(private Urls: ApiUrls){
    super();
  }

  async getFields(): Promise<ApiFields> {
    try {
      const getFieldsUrl = this.Urls.getFieldsUrl;
      const fields = await this.get(getFieldsUrl, 'application/json');
      return fields as unknown as Promise<ApiFields>;
    } catch(err) {
      return Promise.reject(err);
    }
  }

  async getRecord(id: string): Promise<ApiRecord> {
    try {
      const getRecordUrl = this.Urls.getRecordUrl;
      const record = await this.get(`${getRecordUrl}${id}`, 'application/json');
      return record as unknown as Promise<ApiRecord>;
    } catch(err) {
      return Promise.reject(err);
    }
  }

  async getTypes(): Promise<ApiTypes> {
    try {
      const getTypesUrl = this.Urls.getTypesUrl;
      const types = await this.get(getTypesUrl, 'application/json');
      return types as unknown as Promise<ApiTypes>;
    } catch(err) {
      return Promise.reject(err);
    }
  }

  async postField(field: ApiField): Promise<unknown> {
    try {
      const postFieldUrl = this.Urls.postFieldUrl;
      const newField = await this.post(postFieldUrl, 'application/json', field);
      return newField;
    } catch(err) {
      return Promise.reject(err);
    }
  }

  async postRecord(record: ApiRecord): Promise<unknown> {
    try {
      const postRecordUrl = this.Urls.postRecordUrl;
      const newRecord = await this.post(postRecordUrl, 'application/json', record);
      return newRecord;
    } catch(err) {
      return Promise.reject(err);
    }
  }

  async deleteField(id: string): Promise<unknown> {
    try {
      const deleteFieldUrl = this.Urls.deleteFieldUrl;
      const deletedField = await this.delete(`${deleteFieldUrl}${id}`, 'application/json');
      return deletedField;
    } catch(err) {
      return Promise.reject(err);
    }
  }

  async deleteRecord(id: string): Promise<unknown> {
    try {
      const deleteRecordUrl = this.Urls.deleteRecordUrl;
      const deletedRecord = await this.delete(`${deleteRecordUrl}${id}`, 'application/json');
      console.log(deletedRecord)
      return deletedRecord;
    } catch(err) {
      return Promise.reject(err);
    }
  }
  
  async putRecord(id: string, record: ApiRecord): Promise<ApiRecord> {
    try {
      const putRecordUrl = this.Urls.putRecordUrl;
      const updatedRecord = await this.put(`${putRecordUrl}${id}`, 'application/json', record);
      return updatedRecord;
    } catch(err) {
      return Promise.reject(err);
    }
  }

  async getPartyRecords(start: string, limit: number) {
    try {
      const getPartyRecordsUrl = this.Urls.getRecordUrl;
      const partyRecords = await this.get(`${getPartyRecordsUrl}?_start=${start}&_limit=${limit.toString()}`, 'application/json');
      return partyRecords;
    } catch(err) {
      return Promise.reject(err);
    }

  }
}