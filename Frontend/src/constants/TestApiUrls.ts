import { ApiUrls } from "../models/API";
import dotenv from 'dotenv';
dotenv.config({ path: '.env' }); 

export const TestApiUrls: ApiUrls = {
  getFieldsUrl: process.env.API_TEST_GET_FIELDS,
  getRecordUrl: process.env.API_TEST_GET_RECORD,
  postRecordUrl: process.env.API_TEST_POST_RECORD,
  putRecordUrl: process.env.API_TEST_PUT_RECORD,
  deleteRecordUrl: process.env.API_TEST_DELETE_RECORD,
  getTypesUrl: process.env.API_TEST_GET_TYPES,
  postFieldUrl: process.env.API_TEST_POST_FIELD,
  putFieldUrl: process.env.API_TEST_PUT_FIELD,
  deleteFieldUrl: process.env.API_TEST_DELETE_FIELD
};