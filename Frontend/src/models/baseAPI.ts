
export abstract class BaseApi {
  protected get(url: string, contentType: string) {
    console.log(url)
    return fetch(url,{
      method: "GET",
      headers: {
        'Content-Type': contentType,
      },
    })
    .then((response) =>{
      if(!response.ok) {
        return Promise.reject("Не загрузились данные!")
      }
      return response.json();
    })
  }
  
  protected post(url: string, contentType: string, body: {}) {
    return fetch(url,{
      method: "POST",
      headers: {
        'Content-Type': contentType,
      },
      body: JSON.stringify(body),
    })
    .then((response) =>{
      if(!response.ok) {
        return Promise.reject("Не загрузились данные")
      }
      return response.json();
    })
  }

  protected delete(url: string, contentType: string) {
    return fetch(url,{
      method: "DELETE",
      headers: {
        'Content-Type': contentType,
      }
    })
    .then((response) =>{
      if(!response.ok) {
        return Promise.reject("Не загрузились данные")
      }
      return response.json();
    })
  }

  protected put(url: string, contentType: string, body: {}) {
    return fetch(url,{
      method: "PUT",
      headers: {
        'Content-Type': contentType,
      },
      body: JSON.stringify(body),
    })
    .then((response) =>{
      if(!response.ok) {
        return Promise.reject("Не загрузились данные")
      }
      return response.json();
    })
  }
}