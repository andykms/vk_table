import { FormData } from "../basedComponents/Form/Form";

interface ApiData {
  [key: string]: string
}

export function getApiFromData(data: FormData):ApiData {
  const obData: {[key:string]: string} = {};
  Object.keys(data).forEach((dataKey)=>{
    obData[dataKey] = data[dataKey].value;
  })
  return obData
}