import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { Settings } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  options: any;
  settingsReady = false;
  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;
  subSettings: any = SettingsPage;

  /**
   * 
   * @param navCtrl 
   * @param settings 
   * @param formBuilder 
   * @param navParams 
   * @param events 
   * @param translate 
   */
  constructor(
    public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public events: Events,
    public translate: TranslateService) {
  }

  _buildForm() {

    /*let group: any = {
      option1: [this.options.option1],
      option2: [this.options.option2],
      option5: [this.options.option5], 
      option3: [this.options.option3]
    };*/

    let group: any = {
      domain: [this.options.domain]
    };

    /*switch (this.page) {
      case 'main':
        break;
      case 'profile':
        group = {
          option4: [this.options.option4]
        };
        break;
    }*/
    
    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
      this.events.publish('settings:onChanged', this.form.value);
    });
  }

  /**
   * 
   */
  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  /**
   * 
   */
  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
  }

  /**
   * 
   */
  ngOnChanges() {
    console.log('Ng All Changes');
  }
}
