import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './in/app.component';

import { SettingsComponent } from './in/settings/settings.component';

import { PermissionsComponent } from './in/settings/permissions/permissions.component';

const routes: Routes = [
    /* routes specific to current app */
    {
    /*
        default route, for bootstrapping the App
        1) display a loader and try to authenticate
        2) store user details (roles and permissions)
        3) redirect to applicable page (/apps or /auth)
        */
        path: '',
        component: AppComponent
    },
    {
        path: 'settings/permissions/edit/:id',
        component: PermissionsComponent
    },
    {
        path: 'settings/:package',
        component: SettingsComponent
    },
    {
        path: ':package/:app',
        component: AppComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'ignore', useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
