import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {AppknobsConfig, AppknobsConfigService} from './appknobs-config.service';
import {AppknobsService} from './appknobs.service';
import {AppknobsFeatureComponent} from './appknobs-feature.component';

@NgModule({
  declarations: [AppknobsFeatureComponent],
  exports: [AppknobsFeatureComponent],
  imports: [CommonModule]
})
export class AppknobsModule {
  static forRoot(config: AppknobsConfig): ModuleWithProviders {
    return {
      ngModule: AppknobsModule,
      providers: [
        AppknobsService,
        {
          provide: AppknobsConfigService,
          useValue: config
        },
        AppknobsFeatureComponent
      ]
    }
  }
}
