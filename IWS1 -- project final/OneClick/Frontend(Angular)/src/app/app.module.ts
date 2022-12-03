import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxSocialLoginModule } from 'ngx-social-login';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { NpnSliderModule } from "npn-slider";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { MergedComponentComponent } from './components/merged-component/merged-component.component';
import { OnlineComponentComponent } from './components/online-component/online-component.component';
import { RetailComponentComponent } from './components/retail-component/retail-component.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AmazonComponent } from './components/websites/amazon/amazon.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    OnlineComponentComponent,
    RetailComponentComponent,
    MergedComponentComponent,
    AmazonComponent,
    SidenavComponent,
  ],
  imports: [
    LayoutModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    Ng5SliderModule,
    NpnSliderModule,
    NgxSpinnerModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxSocialLoginModule.init(
      {
        google: {
            client_id: '525352292769-2t96d3mo10aavtla8hlnq4s51d16h4h4.apps.googleusercontent.com'
        }
    }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
