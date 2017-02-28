import {NgModule, Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'root-cmp',
  template: `
    Parent:
    <button routerLink="eager">Regular</button>
    <button routerLink="lazy">Angular1</button>

    <hr>
    <router-outlet></router-outlet>
  `,
})
export class RootCmp {}

@Component({
  selector: 'eager-cmp',
  template: `eager`
})
export class EagerCmp {}

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'eager', component: EagerCmp},
      { path: 'lazy', loadChildren: './lazy/index#LazyModule' }
    ])
  ],
  bootstrap: [RootCmp],
  declarations: [EagerCmp, RootCmp],
  providers: [
    {provide: 'ng2provider', useValue: 'ng2value'}
  ]
})
export class AppModule {}