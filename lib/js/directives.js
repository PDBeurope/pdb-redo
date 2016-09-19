;(function () {
  
  'use strict';
  
  angular.module('pdb.redo', ['pdb.redo.services','template/pdbRedo/pdbRedo.html'])
	.directive('pdbRedo', ['pdbRedoService', function(pdbRedoService){
    
		return{
			restrict: 'EAC',
			scope: {
				pdbId : '@',
				headingText: '@',
				errorText: '@',
				subheadingText: '@'
			},
			templateUrl : "template/pdbRedo/pdbRedo.html",
			link: function (scope, element, attrs) {
				
				//Flags to hide/show errors
				scope.showWrapper = true;
				scope.showGeometry = true;
				scope.showModelFit = true;
				scope.showLoader = true;
				
				//default events
				scope.pdbevents = pdbRedoService.createNewEvent(['PDB.pdbRedo.api.loaded','PDB.pdbRedo.loaded','PDB.pdbRedo.failed']);
				
				//Validation
				if(typeof scope.pdbId === 'undefined' || scope.pdbId === '' || scope.pdbId.length !== 4){
					scope.errorMsg = 'Invalid PDB ID!';
					//Dispatch custom failed event
					scope.dispatchEvent('PDB.pdbRedo.failed', {
						pdbId: scope.pdbId,
						error: scope.errorMsg
					});
					return;
				}
				
				//Set Heading Text
				if(typeof scope.headingText === 'undefined' || scope.headingText === ''){
					scope.headingText = 'PDB_REDO model quality changes';
				}
				
				//Set Error message on fail
				if(typeof scope.errorText !== 'undefined'){
					scope.errorMsg = scope.errorText;
				}
				
				//style object to bind with template
				scope.styles = {
					geometryFrame: {},
					modelFitFrame: {}
				}
                
                //Frame width
				scope.frameWidth = element[0].querySelector('.pcl-pdbRedo-position-frame').offsetWidth;
				
				//Method to calculate slider frame position
				var SetSliderPosition = function(data){
					var geometryError = false;
					var modelFitError = false;
                    
                    //Frame width
				    scope.frameWidth = element[0].querySelector('.pcl-pdbRedo-position-frame').offsetWidth;
					
					//Model Geometry calculations
					if(typeof data !== 'undefined' && typeof data.geometry !== 'undefined' && data.geometry !== null){
						var geometryRange = data.geometry['range-upper'] - data.geometry['range-lower'];
						var geometryUnitRange = geometryRange/5;
						
						var subtractor = 1;
						for(var i=0; i<5; i++){
						if(data.geometry.dzscore > data.geometry['range-upper'] - (geometryUnitRange * subtractor)){
							scope.styles.geometryFrame = {'right': (scope.frameWidth * i) +'px'};
                            break;
						}
						subtractor++;
						}
					}else{
						geometryError = true;
					}
					
					//Model Fit calculations
					if(typeof data !== 'undefined' && typeof data.ddatafit !== 'undefined' && data.ddatafit !== null){
						var modelfitRange = data.ddatafit['range-upper'] - data.ddatafit['range-lower'];
						var modelfitUnitRange = modelfitRange/5;
						
						subtractor = 1;
						for(var i=0; i<5; i++){
						if(data.ddatafit.zdfree > data.ddatafit['range-upper'] - (modelfitUnitRange * subtractor)){
							scope.styles.modelFitFrame = {'right': (scope.frameWidth * i) +'px'};
                        	break;
						}
						subtractor++;
						}
						
					}else{
						modelFitError = true;
					}
					
					if(geometryError === true && modelFitError === true){
						scope.showWrapper = false;
                     }else if(geometryError === true){
						scope.showWrapper = true;
						scope.showGeometry = false;
					}else if(modelFitError === true){
						scope.showWrapper = true;
						scope.showModelFit = false;
					}else{
						scope.showWrapper = true;
                    }
					scope.showLoader = false;
                    scope.$apply();
				}
				
			  	//Method to dispach custom pdb events
				scope.dispatchEvent = function (eventType, eventData, eventElement) {
					var dispatchEventElement = element[0];
					if(typeof eventElement !== 'undefined'){
						dispatchEventElement = eventElement;
					}
					if(typeof eventData !== 'undefined'){
						scope.pdbevents[eventType]['eventData'] = eventData;
					}
					dispatchEventElement.dispatchEvent(scope.pdbevents[eventType])
				};
				
				//Call API for data
				var apiData = pdbRedoService.getApiData(scope.pdbId).then(function(data) {
                    //Dispatch custom api loaded event
					scope.dispatchEvent('PDB.pdbRedo.api.loaded', { pdbId: scope.pdbId });
                    setTimeout(function(){
                        SetSliderPosition(data);
                        
                        if(scope.showWrapper == true){
                            //Dispatch custom loaded event
                            scope.dispatchEvent('PDB.pdbRedo.loaded', { pdbId: scope.pdbId });
                        }else{
                            
                            //Show error message
                            if(typeof scope.errorText !== 'undefined'){
                                scope.errorMsg = scope.errorText;
                            }else{
                                scope.errorMsg = 'Error: Data not Available!';
                            }
                            
                            //Dispatch custom failed event
                            scope.dispatchEvent('PDB.pdbRedo.failed', {
                                pdbId: scope.pdbId,
                                error: scope.errorMsg
                            });
                        }
                        
                    },100);
                }, function(error) {
					scope.showWrapper = false;
					// promise rejected
					if(window.console){ console.log('API request failed. Error: '+ error) }
					
					if(typeof scope.errorText !== 'undefined'){
						scope.errorMsg = scope.errorText;
					}else{
						scope.errorMsg = 'Error: '+ error;
					}
					//Dispatch custom failed event
					scope.dispatchEvent('PDB.pdbRedo.failed', {
						pdbId: scope.pdbId,
						error: scope.errorMsg
					});
				});
				
			}
		}
	
	}])
	  
}());