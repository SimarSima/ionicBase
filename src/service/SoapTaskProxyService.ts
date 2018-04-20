import { Injectable } from "@angular/core";
import { Client, SOAPService } from "ngx-soap";
import { Http } from '@angular/http';

@Injectable()
export class SoapTaskProxyService {
    private client: Client;
    constructor(private soap: SOAPService, private http: Http) { }
    Login(): Promise<any> {
        let thisServe = this;
        let promise = new Promise(function (resolve, reject) {
            thisServe.http.get("/test_url")
                .subscribe(function (response) {
                    if (response && response.text()) {
                        thisServe.soap.createClient(response.text())
                            .then(function (client: Client) {
                                thisServe.client = client;
                                let body = {
                                    identifierJson: ""
                                };
                                thisServe.client.operation('LoginByMobile', body)
                                    .then(function (operation) {
                                        if (operation.error) {
                                            console.log('Operation error', operation.error);
                                            return;
                                        }
                                        thisServe.http.post("", operation.xml, { headers: operation.headers })
                                            .subscribe(function (response) {
                                                let xmlResponse = response.text();
                                                let jsonRes = thisServe.client.parseResponseBody(response.text());
                                                let message = jsonRes.Body.LoginByMobileResponse.LoginByMobileReturn.$value;
                                                let res = JSON.parse(message)
                                                resolve(res);
                                            });
                                    });
                            })
                    }
                });
        });

        return promise;
    }

    main() {
    }

}