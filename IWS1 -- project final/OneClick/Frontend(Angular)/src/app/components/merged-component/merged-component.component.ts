import { WebsitesService } from './../../services/websites.service';
import { Component, OnInit } from '@angular/core';
import { DataTransferService } from './../../services/data-transfer.service';
import { ViewTransferService } from 'src/app/services/view-transfer.service';
import { CartService } from './../../services/cart.service';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-merged-component',
  templateUrl: './merged-component.component.html',
  styleUrls: ['./merged-component.component.css']
})
export class MergedComponentComponent implements OnInit {

  mobile_view: boolean;
  description: string;
  show: boolean;
  cart: any;
  view_status: boolean;
  dataArray = {
    online: [],
    retail: [],
    merge: []
  };
  onlineArray = [];
  retailArray = [];
  mergedArray = [];
  websiteArray = {
    amazon: {
      url :"https://www.amazon.in/",
      src :"https://i.insider.com/539f3ffbecad044276726c01?width=1100&format=jpeg&auto=webp",
    }
  };

  constructor(private dts:DataTransferService, private vts:ViewTransferService, private cs: CartService, private breakpointObserver: BreakpointObserver, private loginService: LoginService, private cartService: CartService) { }

  ngOnInit() {

    // DEVICES LESS THAN 500PX WIDTH
    this.breakpointObserver
      .observe(['(min-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.mobile_view = true;
        } else {
          this.mobile_view = false;
        }
        console.log(this.mobile_view);
      });

    this.dts.currentDescription.subscribe(dataArray => {
      if (dataArray) {
        this.dataArray = dataArray;
        this.mergedArray = this.dataArray.merge;

        if(this.mergedArray.length) {
          this.show = true;
          //Display the online results
          console.log("Merged Results: ",this.mergedArray.length);

        }
        else{
          this.show = false;
          console.log("Sorry no results to display from Merged Component");
        }
      }

    });

    this.vts.currentView.subscribe(vid => {
      debugger;
      if (vid == 1) {
        this.view_status = true;
      }
      else {
        this.view_status = false;
      }
    });
  }

  changeCartStatus(product) {
    product.cart = !product.cart;
    if(product.cart) {
      if (this.loginService.isAlreadyLogin()) {
        //CART SERVICE CALL
        this.cartService.getCart().subscribe((content) => {
          var cart_list = content;
          cart_list.push(product);
          var nc = {
            "new_cart": JSON.stringify(cart_list)
          };
          this.cartService.postCart(nc).subscribe((res) => {
            console.log(res);
          });
        });
      }
      else {
        if (localStorage.getItem('CART') === null){
          var temp = [];
          temp.push(product);
        }
        else {
          temp = JSON.parse(localStorage.getItem('CART'));
          temp.push(product);
        }

        localStorage.removeItem('CART');
        localStorage.setItem('CART', JSON.stringify(temp));
      }
    }
  }

}
