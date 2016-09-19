# PDB Redo

[![NPM version](http://img.shields.io/npm/v/pdb-redo.svg)](https://www.npmjs.org/package/pdb-redo) 

The PDB_REDO component shows the change in geometric quality (a combined score for Ramachandran plot, side-chain rotamer, and atomic packing quality) and fit to the experimental data between original PDB entry and its re-refined and rebuilt PDB_REDO counterpart.

It is a <a href="http://www.ebi.ac.uk/pdbe/pdb-component-library" target="_blank">PDB Component Library</a> component.

![PDB_REDO](/assets/pdb-redo.png)

## Getting Started
It takes only 3 easy steps to get started with PDB Components.

* Include module files and required dependencies
* Install the component
* Use component as custom element anywhere in the page

>*If you have installed the <a href="http://www.ebi.ac.uk/pdbe/pdb-component-library" target="_blank">PDB Component Library</a> in your application then you can directly start using the component as custom element (refer step 3).*

#### **1.** Include module files and dependencies
Download the module javascript and stylesheet files (pdb.redo.min.js and pdb.redo.min.css) stored in the 'build' folder. Include the files in your page &lt;head&gt; section.

You'll also need to include the AngularJS library file (please refer *'bower.json'* file for complete dependency details).
```html
<!-- AngularJs dependency scripts (these can be skipped if already included in page) -->
<script src="bower_components/angular/angular.min.js"></script>

<!-- minified component CSS and script -->
<link rel="stylesheet" href="build/pdb.redo.min.css" />
<script src="build/pdb.redo.min.js"></script>
```

#### **2.** Installation
As soon as you've got the dependencies and library files included in your application page you just need to include following installation script :

***I)*** If you are developing an AngularJs Application

```html
<script>
angular.module('myModule', ['pdb.redo']);
</script>
```

***II)*** For other Applications

```html
<script>
(function () {
  'use strict';
  angular.element(document).ready(function () {
      angular.bootstrap(document, ['pdb.redo']);
  });
}());
</script>
```

#### **3.** Using component as custom element anywhere in the page

The component can be used as custom element, attribute or class anywhere in the page.

```html
<!-- component as custom element -->
<pdb-redo pdb-id="1cbs"></pdb-redo>

<!-- component as attribute -->
<div pdb-redo pdb-id="1cbs"></div>

<!-- component as class -->
<div class="pdb-redo" pdb-id="1cbs"></div>

```
## Documentation

### Attributes
| Sr. No.        | Attribute           | Values  | Description |
|:-------------:|:-------------|:-----|:-----|
| 1      |pdb-id | PDB ID_ <br>**Mandatory attribute!**  | Example : pdb-id="1cbs" |
| 2      | heading-text |_String_ <br>*(Optional Attribute)*<br>Default : 'PDB_REDO model quality changes' |Example : heading-text="PDB_REDO Component"<br>If set blank (heading-text="") it removes the heading.  |
| 3      | subheading-text | _String_ <br>*(Optional Attribute)*<br>Default : '' (blank) |It can be used to add explanatory details between heading and sliders <br>Example : subheading-text="The sliders below show the change in.."    |
| 4      | error-text | _String_ <br>*(Optional Attribute)*<br>Default : 'Error:'(internal error) |Example : error-text="Error loading PDB_REDO" <br>If set blank (error-text="") it shows no message on error.  |

### Custom Events
Use this to subscript/bind events of this component. Event data (available in key = 'eventData') contains information about the residue number, chain, entry and entity, etc.

| Sr. No.        | Event | Description |
|:-------------:|:-------------|:-----|
| 1 | PDB.pdbRedo.loaded | use this event to confirm whether the component is loaded<br> Example:<br> document.addEventListener('PDB.pdbRedo.loaded', function(e){ /\/do something on event }) |
| 2 | PDB.pdbRedo.api.loaded | use this event to confirm whether the component API response is received<br> Example:<br> document.addEventListener('PDB.pdbRedo.api.loaded', function(e){ /\/do something on event }) |
| 3 | PDB.pdbRedo.failed | use this event to check component loading failure<br> Example:<br> document.addEventListener('PDB.pdbRedo.failed', function(e){ /\/do something on event }) |

*Please refer <a href="http://www.ebi.ac.uk/pdbe/pdb-component-library/doc.html#a_pdbRedo" target="_blank">this link</a> for more documentation, demo and parameters details.*

## Contact
Please <a href="https://github.com/mandarsd/pdb-redo">use github</a> to report **bugs**, discuss potential **new features** or **ask questions** in general. Also you can <a href="http://www.ebi.ac.uk/pdbe/about/contact" target="_blank">contact us here</a> for support, feedback or to report any issues.

## License
The plugin is released under the Apache License Version 2.0. You can find out more about it at http://www.apache.org/licenses/LICENSE-2.0 or within the license file of the repository.

## If you are interested in this plugin...
...you might also want to have a look at the <a href="http://www.ebi.ac.uk/pdbe/pdb-component-library" target="_blank">PDB Component Library</a>.


"# pdb-redo" 
