import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../models/API";
import { MainApiUrls } from "../../constants/MainApiUrls";

interface ApiField {
  id: string;
  name: string;
}

interface ApiRecord {
  id: string;
  [key: string]: string;
}

const api = new Api(MainApiUrls);

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
  async (record: ApiRecord) => {
    const response = await api.putRecord(record.id, record);
    return response;
  }
);

export const addTableRecord = createAsyncThunk(
  "table/addTableRecord",
  async (record: ApiRecord) => {
    const response = await api.postRecord(record);
    return response;
  }
);
