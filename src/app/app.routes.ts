import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatComponent } from './pages/cat/cat.component';
import { ProductComponent } from './pages/product/product.component';
import { PpeopleComponent } from './pages/ppeople/ppeople.component';
import { PcatComponent } from './pages/pcat/pcat.component';
import { EventComponent } from './pages/event/event.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'cat', component: CatComponent },
    { path: 'product', component: ProductComponent },
    { path: 'ppeople', component: PpeopleComponent },
    { path: 'pcat', component: PcatComponent },
    { path: 'event', component: EventComponent },
    { path: 'reservation', component: ReservationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },

];


