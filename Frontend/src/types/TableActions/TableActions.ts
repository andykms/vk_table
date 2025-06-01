import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../models/API";
import { MainApiUrls } from "../../constants/MainApiUrls";

interface ApiField {
  id: string;
  name: string;
}

interface PostedApiRecord {
  id: string;
  [key: string]: string|number|boolean|null;
}

const api = new Api(MainApiUrls);

export const getTableTypes = createAsyncThunk(
  "table/getTableTypes",
  async () => {
    const response = await api.getTypes();
    return response;
  }
);


export const getTableFields = createAsyncThunk(
  "table/getTableFields",
  async () => {
    const response = await api.getFields();
    return response;
  }
);

export const getTableRecord = createAsyncThunk(
  "table/getTableRecords",
  async (id: string) => {
    const response = await api.getRecord(id);
    return response;
  }
);

export const createTableField = createAsyncThunk(
  "table/createTableField",
  async (field: ApiField) => {
    const response = await api.postField(field);
    return response;
  }
);

export const deleteTableRecord = createAsyncThunk(
  "table/deleteTableRecord",
  async (id: string) => {
    const response = await api.deleteRecord(id);
    return response;
  }
);

export const putTableRecord = createAsyncThunk(
  "table/putTableRecord",
  async (record: PostedApiRecord) => {
    const response = await api.putRecord(record.id, record);
    return response;
  }
);

export const addTableRecord = createAsyncThunk(
  "table/addTableRecord",
  async (record: PostedApiRecord) => {
    const response = await api.postRecord(record);
    return response;
  }
);

export const getTenTableRecords = createAsyncThunk(
  "table/getTenTableRecords",
  async (id: string) => {
    const response = await api.getPartyRecords(id, 10);
    return response;
  }
);

export const deleteField = createAsyncThunk(
  "table/deleteField",
  async (id: string) => {
    const response = await api.deleteField(id);
    return response;
  }
);

export const getTableLength = createAsyncThunk(
  "table/getTableLength",
  async () => {
    const response = await api.getLength();
    return response;
  }
);

export const putTableLength = createAsyncThunk(
  "table/putTableLength",
  async (length: number) => {
    const response = await api.putLength(length);
    return response;
  }
);