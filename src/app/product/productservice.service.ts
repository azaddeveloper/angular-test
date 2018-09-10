import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; //if not urn use this command npm install rxjs-compat 
let getalldata='http://localhost/codeigniter-api/Api/user';
let file='http://localhost/codeigniter-api/Api/file_upload';
@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  private headers = new Headers(); 
  handler(error) {
    return Observable.throw(error.json().error || 'server error');
  }
  constructor(private http:HttpClient) { }
  get_all_data(page_number){
    let myparams=new HttpParams()
    .set('page_number',page_number);
    return this.http.get(getalldata,{params:myparams}).catch(this.handler);
  }
  uploadFile(fileToUpload: File){
    const _formData = new FormData();
    _formData.append('file', fileToUpload, fileToUpload.name);   
    return this.http.post(file,_formData).catch(this.handler);
  
  }
}
