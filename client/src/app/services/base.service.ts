import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

export abstract class BaseService {
  protected UrlServiceV1: string = "http://localhost:8287/api/v1/";
    
    protected extractData(response: any){
        return response.data || {};
    }

    protected serviceError(error: Response | any){
        let errMsg: string;

        if (error instanceof Response) {

            errMsg = `${error.status} - ${error.statusText || ''}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(error);
        return Observable.throw(error);
    }
}