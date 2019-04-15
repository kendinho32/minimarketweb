import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { appRoutingProviders, routing } from './app.routing';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriaService } from './services/categoria.service';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EditproductsComponent } from './editproducts/editproducts.component';
import { DialogcartComponent } from './dialogcart/dialogcart.component';
import { MiscomprasComponent } from './miscompras/miscompras.component';
import { CreatesliderComponent } from './createslider/createslider.component';
import { GetslidersComponent } from './getsliders/getsliders.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    SliderComponent,
    FooterComponent,
    LoginComponent,
    ContactComponent,
    CartComponent,
    DialogComponent,
    ProductosComponent,
    CategoriasComponent,
    EditproductsComponent,
    DialogcartComponent,
    MiscomprasComponent,
    CreatesliderComponent,
    GetslidersComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
      DialogComponent,
      DialogcartComponent
  ],
  providers: [appRoutingProviders, CategoriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
