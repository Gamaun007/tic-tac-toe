import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFirebaseWrapperService } from './services/user-firebase-wrapper/user-firebase-wrapper.service';
import { UserFacadeService } from './services/user-facade/user-facade.service';

@NgModule({
  imports: [CommonModule],
  providers: [UserFirebaseWrapperService, UserFacadeService]
})
export class UserModule {

}
