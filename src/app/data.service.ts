import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject }  from 'rxjs';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
   
  private messageSource = new BehaviorSubject <string>("false");
  public newcarsubject = new Subject <any>();
  currentMessage= this.messageSource.asObservable();
  constructor(private http:HttpClient) { }

  getdata()
  {
      return this.http.get('assets/list.json');
         

  }

  changemessage(message : string)
  {
    this.messageSource.next(message);
  }

  addcard(data)
  {
    this.newcarsubject.next(data);
  }
}
