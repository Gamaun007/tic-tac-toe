import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './core/auth/auth.module';
import { LeftSideComponent } from './layout/components/left-side/left-side.component';
import { TopHeaderComponent } from './layout/components/top-header/top-header.component';
import { MainContentComponent } from './layout/components/main-content/main-content.component';
import { APP_CONFIG } from './shared/modules/configuration/services/config/app-config.service';
import { configWrapper } from 'src/configurations/init-config.function';
// import { ScoreSidePanelComponent } from './shared-modules/score-table/components/score-side-panel/score-side-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftSideComponent,
    TopHeaderComponent,
    MainContentComponent,
    // ScoreSidePanelComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot(),
    AppRoutingModule
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
