import { LitElement } from "lit-element";

class PdbRedo extends LitElement {

  static get properties() {
    return {
      pdbId: { type: String, attribute: 'pdb-id' },
    };
  }

  validateParams() {
    if(typeof this.pdbId == 'undefined') return false;
    return true
  }

  connectedCallback() {
    super.connectedCallback();

    let paramValidatity = this.validateParams();
    if(!paramValidatity) return

    // create an instance of the plugin
    this.viewInstance = new PdbRedoPlugin();    
    this.viewInstance.render(this, this.pdbId);
  }

  createRenderRoot() {
    return this;
  }

}

export default PdbRedo;

customElements.define('pdb-redo', PdbRedo);