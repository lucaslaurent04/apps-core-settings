import { Component, OnInit, NgZone  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextService, ApiService, AuthService, EnvService } from 'sb-shared-lib';
import { AppStateService } from 'src/app/_services/AppStateService';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit  {

    public ready: boolean = false;
    public package: string = '';
    public app: string = '';

    constructor(
        private context: ContextService,
        private env: EnvService,
        private route: ActivatedRoute,
        private params: AppStateService
    ) {}

    private getDescriptor() {
        return {
            route: "/settings/core"
        };
    }

    public ngOnInit() {
        this.context.ready.subscribe( (ready:boolean) => {
            this.ready = ready;
        });

        // extract package and app from URL and relay to the AppStateService
        this.route.params.subscribe(async params => {
                if(params.hasOwnProperty('package')) {
                    this.package = params.package;
                }
                if(params.hasOwnProperty('app')) {
                    this.app = params.app;
                }
                this.params.updateParamState({package: this.package, app: this.app});
            });

    }

    public ngAfterViewInit() {
        console.log('AppComponent::ngAfterViewInit');

        // this.context.change(this.getDescriptor());
    }

}