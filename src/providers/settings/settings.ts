import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Settings {

  private SETTINGS_KEY: string = '_settings';
  settings: any;
  _defaults: any;
  _readyPromise: Promise<any>;

  /**
   * 
   * @param storage 
   * @param events 
   * @param defaults 
   */
  constructor( public storage : Storage, defaults: any) {
    this._defaults = defaults;
  }

  /**
   * 
   */
  load() {
    return this.storage.get(this.SETTINGS_KEY).then((value) => {
      if (value) {
        this.settings = value;
        return this._mergeDefaults(this._defaults);
      } else {
        return this.setAll(this._defaults).then((val) => {
          this.settings = val;
        })
      }
    });
  }

  /**
   * 
   * @param defaults 
   */
  _mergeDefaults(defaults: any) {
    for (let k in defaults) {
      if (!(k in this.settings)) {
        this.settings[k] = defaults[k];
      }
    }
    return this.setAll(this.settings);
  }

  /**
   * 
   * @param settings 
   */
  merge(settings: any) {
    for (let k in settings) {
      this.settings[k] = settings[k];
    }
    return this.save();
  }

  /**
   * 
   * @param key 
   * @param value 
   */
  setValue(key: string, value: any) {
    this.settings[key] = value;
    return this.storage.set(this.SETTINGS_KEY, this.settings);
  }

  /**
   * 
   * @param key 
   * @param value 
   */
  setValueTest(key: string, value: any) {
    this.settings[key] = value;
    return this.storage.set(key, key);
  }

  /**
   * 
   * @param value 
   */
  setAll(value: any) {
    return this.storage.set(this.SETTINGS_KEY, value);
  }

  /**
   * 
   * @param key 
   */
  getValue(key: string) {
    return this.storage.get(this.SETTINGS_KEY)
      .then(settings => {
        return settings[key];
      });
  }

  /**
   * 
   */
  save() {
    return this.setAll(this.settings);
  }

  /**
   * 
   */
  get allSettings() {
    return this.settings;
  }
}
