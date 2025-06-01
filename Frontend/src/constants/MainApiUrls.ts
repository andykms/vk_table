import { ApiUrls } from "../models/API";
import {
  API_GET_FIELDS,
  API_GET_FIELD,
  API_GET_TYPES,
  API_POST_FIELD,
  API_PUT_FIELD,
  API_DELETE_FIELD,
  API_GET_RECORD,
  API_POST_RECORD,
  API_PUT_RECORD,
  API_DELETE_RECORD,
  API_GET_LENGTH
} from '../../ApiUrls';


export const MainApiUrls: ApiUrls = {
  getFieldsUrl: API_GET_FIELDS,
  getRecordUrl: API_GET_RECORD,
  postRecordUrl: API_POST_RECORD,
  putRecordUrl: API_PUT_RECORD,
  deleteRecordUrl: API_DELETE_RECORD,
  getTypesUrl: API_GET_TYPES,
  postFieldUrl: API_POST_FIELD,
  putFieldUrl: API_PUT_FIELD,
  deleteFieldUrl: API_DELETE_FIELD,
  getLengthUrl: API_GET_LENGTH,
};