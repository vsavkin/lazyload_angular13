import { ComponentRef, ElementRef, NgModule, Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';
import 'angular';

const angular13:any = (<any>window).angular;
export const Ng1Module = angular13.module('Ng1Module', []);
Ng1Module.directive('ng1test', (ng2provider) => (
  { template: `Angular-1-Component. Ng2Provider: ${ng2provider}` }
));
Ng1Module.factory('ng2provider', downgradeInjectable("ng2provider"));

@Component({
  selector: 'lazy',
  template: `
    <div id="ng1root"><ng1test></ng1test></div>
    lazy
  `
})
export class LazyCmp implements OnInit {
  constructor(private ref: ElementRef, private upgrade: UpgradeModule) {}

  ngOnInit() {
    const root = this.ref.nativeElement.querySelector("#ng1root");
    console.log("bootstrap")
    this.upgrade.bootstrap(root, [Ng1Module.name]);
  }
}

@NgModule({
  imports: [
    UpgradeModule,
    RouterModule.forChild([
      { path: '', component: LazyCmp }
    ])
  ],
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [LazyCmp]
})
export class LazyModule {
}