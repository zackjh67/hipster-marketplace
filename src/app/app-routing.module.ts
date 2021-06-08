import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {ItemComponent} from './item/item.component';
import {CartComponent} from './cart/cart.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'item/:id', component: ItemComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
