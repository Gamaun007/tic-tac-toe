import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundLayoutComponent } from './components';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PlaygroundLayoutComponent,
  },
];



@NgModule({
  declarations: [PlaygroundLayoutComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PlaygroundModule { }
