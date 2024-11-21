import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { pairwise, startWith } from 'rxjs/operators';
import { SettingService } from 'src/app/settingService';

@Component({
  selector: 'app-widget-select-many2one',
  templateUrl: './widget-select-many2one.component.html',
  styleUrls: ['./widget-select-many2one.component.scss']
})
export class WidgetSelectMany2oneComponent implements OnInit {

  @Input() setting: any;

  public settingValue: any;
  public settingName: any;

  public mode: 'view' | 'edit' = 'view';

  public control = new FormControl();
  public focusState: any;
  public previousValue: any;

  constructor(public service: SettingService) { }

  public ngOnInit(): void {

    this.settingValue = this.setting.setting_values_ids[0].value;
    this.settingName = this.setting.code;

    this.control.valueChanges.pipe(
      startWith(this.settingValue),
      pairwise()
    ).subscribe(
      ([old, value]) => {
        this.settingValue = value;
        this.previousValue = old;
      }
    );
    this.control.setValue(this.settingValue);
  }

  public onChange(eventValue: { id: number } | ''): void {
    this.settingValue = eventValue === '' ? null : eventValue.id;

    // use the service to add the elements
    this.service.toQueue(
      this.setting.setting_values_ids[0].id,
      { newValue: this.settingValue, oldValue: this.previousValue }
    ).subscribe((action) => {
      if (action === 'undo') {
        this.mode = 'edit';
      }
    });

    this.mode = 'view';
  }

  public onCancel(): void {
    this.mode = 'view';
  }
}
