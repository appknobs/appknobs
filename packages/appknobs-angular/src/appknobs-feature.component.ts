import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {AppknobsService} from './appknobs.service';

@Component({
  selector: 'ak-feature', // tslint:disable-line component-selector
  providers: [AppknobsService],
  template: `<ng-container *ngIf="enabled"><ng-content></ng-content></ng-container>`
})
export class AppknobsFeatureComponent implements OnInit, OnDestroy {
  @Input() name = null
  private unsubscribe
  public enabled = false

  constructor(private service: AppknobsService) { }

  ngOnInit() {
    this.unsubscribe = this.service.subscribe(({features}) => {
      this.enabled = Boolean(features[this.name])
    })
  }

  ngOnDestroy() {
    this.unsubscribe()
  }

}
