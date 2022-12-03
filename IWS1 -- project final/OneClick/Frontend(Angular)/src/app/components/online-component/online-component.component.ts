import { CartService } from './../../services/cart.service';
import { LoginService } from './../../services/login.service';
import { ViewTransferService } from './../../services/view-transfer.service';
import { DataTransferService } from './../../services/data-transfer.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-online-component',
  templateUrl: './online-component.component.html',
  styleUrls: ['./online-component.component.css']
})
export class OnlineComponentComponent implements OnInit {

  mobile_view: boolean;
  description: string;
  show: boolean;
  view_status: boolean;
  dataArray = {
    online: [],
    retail: []
  };

  onlineArray = [];
  websiteArray = {
    amazon: {
      url :"https://www.amazon.in/",
      src :"https://i.insider.com/539f3ffbecad044276726c01?width=1100&format=jpeg&auto=webp",
    },
  };
  constructor(private dts:DataTransferService, private vts:ViewTransferService, private breakpointObserver: BreakpointObserver, private loginService: LoginService, private cartService: CartService) { }

  ngOnInit(): void {

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
        this.onlineArray = this.dataArray.online;
        //console.log(onlineArray);
        if(this.onlineArray.length) {
          this.show = true;
          //Display the online results
          console.log("Online Products: ",this.onlineArray.length);
        }
        else{
          this.show = false;
          console.log("Sorry no results to display from Online Component");
        }
      }

    });

    this.vts.currentView.subscribe(vid => {
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

  formatPrice(val:string) {
    return val?.replace(/\D+/g, '');
  }
}
