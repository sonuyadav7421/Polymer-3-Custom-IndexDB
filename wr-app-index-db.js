import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {
  mixinBehaviors
} from '@polymer/polymer/lib/legacy/class.js';
import './localForage.js';

/**
 * `wr-app-index-db`
 * Offline Support DB for app
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class WrAppIndexDb extends mixinBehaviors([],PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
    
    `;
  }
 static get properties() {
    return {
      dbName: {
        type: String,       
        observer: '_createInstance',
      },
      db: {
        type: Object,
        notify: true,
      },
    };
  }

  ready(){
    super.ready();   
  }

  _createInstance(name) {
    if (name) {
      if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
      }else{
        var _self = this;
        let instance = localforage.createInstance({         
          driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
          name        : name,
          version     : 1.0,
         // size        : 49807360, // Size of database, in bytes. WebSQL-only for now.
          storeName   : 'withRun', // Should be alphanumeric, with underscores.
          description : 'WithRun IndexDB'
        });       
        _self.set("db",instance);
      }    
    }
  }
}

window.customElements.define('wr-app-index-db', WrAppIndexDb);
