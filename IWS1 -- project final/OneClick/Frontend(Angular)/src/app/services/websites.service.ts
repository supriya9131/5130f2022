import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsitesService {

  currentWebData = new Subject<any>();

  constructor() { }

  dynamicWebData(webdata: any) {
    debugger;
    this.currentWebData.next(webdata);
  }
}
