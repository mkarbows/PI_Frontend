import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

// components
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';
import { ItemContainerComponent } from './containers/item-container/item-container.component';
import { ItemFullsizeContainerComponent } from './containers/item-fullsize-container/item-fullsize-container.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RightPanelContainerComponent } from './containers/right-panel-container/right-panel-container.component';

// guards
import {
  LoadItemsGuard,
  ItemFullsizeGuard,
  ItemNavGuard,
  NavTypeGuard,
  MapGuard
} from './core/guards';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'dashboard',
    redirectTo: '/dashboard/media/1?type=photo',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardContainerComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    canActivate: [MapGuard],
    children: [
      {
        path: '',
        component: RightPanelContainerComponent,
        children: [
          {
            path: ':selectedNavType/:currentPage',
            component: ItemContainerComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            canActivate: [NavTypeGuard, LoadItemsGuard, ItemNavGuard, ItemFullsizeGuard]
          },
          {
            path: ':selectedNavType/:currentPage/:itemUrlEndpoint',
            component: ItemFullsizeContainerComponent,
            canActivate: [NavTypeGuard, ItemNavGuard, ItemFullsizeGuard]
          }
        ]
      }
    ]
  },
  {
    path: 'dashboard/:selectedNavType',
    redirectTo: 'dashboard/:selectedNavType/1',
    canActivate: [NavTypeGuard]
  }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
