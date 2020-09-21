class PdbRedoPlugin { 

    apiData: any;
    targetEle: HTMLElement;
    pdbevents: any
    
    render(target: HTMLElement, pdbId: string) {
        if(!target && !pdbId) return;
        this.targetEle = <HTMLElement> target;
        this.getApiData(pdbId.toLowerCase()).then(resultData => {
            if(resultData){
                this.apiData = resultData;
                this.createTemplate();
                this.getSliderPosition();
            }
        });
    }

    async getApiData(pdbId: string) {
        try {
          let url = `https://pdb-redo.eu/db/${pdbId}/pdbe.json`;
          return await (await fetch(url)).json();
        } catch (e) {
          console.log(`Couldn't load PDB-REDO data`, e);
        }
    }

    createTemplate(){
        this.targetEle.innerHTML = `<div class="pcl-pdbRedo-wrapper">
                <div class="pcl-pdbRedo-row geometrySection" style="margin-bottom: 2px;">
                    <div class="pcl-pdbRedo-label">Model Geometry</div>
                    <div class="pcl-pdbRedo-gradient">&nbsp;</div>
                    <div class="pcl-pdbRedo-position-frame geometryFrame">&nbsp;</div>
                </div>
                <div class="pcl-pdbRedo-row modelFitSection">
                    <div class="pcl-pdbRedo-label">Fit model/data</div>
                    <div class="pcl-pdbRedo-gradient">&nbsp;</div>
                    <div class="pcl-pdbRedo-position-frame modelFitFrame">&nbsp;</div>
                </div>
                <div class="pcl-pdbRedo-link-row">
                    <a target="_blank" href="https://pdb-redo.eu/db/${this.apiData.pdbid}">PDB-REDO</a>
                </div>
            </div>`
    }

    getSliderPosition (){
        let data = this.apiData;
        let geometryError = false;
        let modelFitError = false;

        //Frame width
        const geometrySectionEle: HTMLElement = this.targetEle.querySelector('.geometrySection') as HTMLElement;
        const frameWidth = (geometrySectionEle.querySelector('.pcl-pdbRedo-position-frame') as HTMLElement).offsetWidth;

        //Model Geometry calculations
        if(typeof data !== 'undefined' && typeof data.geometry !== 'undefined' && data.geometry !== null){
            const geometryRange = data.geometry['range-upper'] - data.geometry['range-lower'];
            const geometryUnitRange = geometryRange/5;

            let subtractor = 1;
            for(let i=0; i<5; i++){
                if(data.geometry.dzscore > data.geometry['range-upper'] - (geometryUnitRange * subtractor)){
                    //scope.styles.geometryFrame = {'right': (this.frameWidth * i) +'px'};
                    (this.targetEle.querySelector('.geometryFrame') as HTMLElement).style.right = (frameWidth * i) +'px';
                    break;
                }
                subtractor++;
            }
        }else{
            geometryError = true;
        }

        //Model Fit calculations
        if(typeof data !== 'undefined' && typeof data.ddatafit !== 'undefined' && data.ddatafit !== null){
            const modelfitRange = data.ddatafit['range-upper'] - data.ddatafit['range-lower'];
            const modelfitUnitRange = modelfitRange/5;

            let mfSubtractor = 1;
            for(let i=0; i<5; i++){
                if(data.ddatafit.zdfree > data.ddatafit['range-upper'] - (modelfitUnitRange * mfSubtractor)){
                    //scope.styles.modelFitFrame = {'right': (scope.frameWidth * i) +'px'};
                    (this.targetEle.querySelector('.modelFitFrame') as HTMLElement).style.right = (frameWidth * i) +'px';
                    break;
                }
                mfSubtractor++;
            }

        }else{
            modelFitError = true;
        }

        if(geometryError === true && modelFitError === true){
            this.targetEle.innerHTML = ``;
         }else if(geometryError === true){
            geometrySectionEle.innerHTML = `<div class="pcl-pdbRedo-error">Data not available</div>`;
        }else if(modelFitError === true){
            let modelFitSectionEle: HTMLElement = this.targetEle.querySelector('.modelFitSection') as HTMLElement;
            modelFitSectionEle.innerHTML = `<div class="pcl-pdbRedo-error">Data not available</div>`;
        }
    }

}

(window as any).PdbRedoPlugin = PdbRedoPlugin;