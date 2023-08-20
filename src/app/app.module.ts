import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './core/auth/auth.module';
import { APP_CONFIG } from './shared/modules/configuration/services/config/app-config.service';
import { configWrapper } from 'src/configurations/init-config.function';
import { AngularFireModule } from '@angular/fire/compat';
import { ClarityModule } from '@clr/angular';
import { LoginModule } from './modules/login/login.module';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { TicTacToeModule } from './shared/modules/tic-tac-toe/tic-tac-toe.modules';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    LayoutModule,
    AngularFireModule.initializeApp(configWrapper.config.firebase),
    AngularFireDatabaseModule,
    AuthModule.forRoot(),
    TicTacToeModule.forRoot(),
    AppRoutingModule,
    ClarityModule,
    LoginModule
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: configWrapper.config
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
