import { BaseRequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MyRequestOptions extends BaseRequestOptions {
  public constructor() {
    super();
  }
  public getHeaders(): Headers {
    return this.headers;
  }

}