import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl ='http://localhost:8091/municipalites';


@Injectable({
  providedIn: 'root'
})
export class MunicipaliteService {

  constructor(private http: HttpClient) {}

  get(id){
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data){
    return this.http.post(baseUrl,data);
  }

  update(id,data){
    return this.http.put(`${baseUrl}/${id}`,data);
  }

  delete(id){
    return this.http.delete(`${baseUrl}/${id}`);
  }


  findByNom(nom){
    return this.http.get(`${baseUrl}?nom=${nom}`);
  }

  getAll(){
    return this.http.get(baseUrl);
  }


}
