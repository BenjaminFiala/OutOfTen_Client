import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from "@angular/router";
import {HomeComponent} from "../../components/home/home.component";
import {LoginComponent} from "../../components/login/login.component";
import {SignupComponent} from "../../components/signup/signup.component";
import {ProductsComponent} from "../../components/products/products.component";

const routes: Routes=[
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'products',component:ProductsComponent}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule {

}
