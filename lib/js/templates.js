angular.module("template/pdbRedo/pdbRedo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pdbRedo/pdbRedo.html",
    '<div class="pcl-pdbRedo-wrapper" ng-show="showWrapper">'+
		'<div class="pcl-pdbRedo-loader" ng-show="showLoader">'+
			'<img ng-src="//www.ebi.ac.uk/pdbe/widgets/html/loading.gif" border="0">'+
		'</div>'+
		'<div class="pcl-pdbRedo-heading">{{headingText}}</div>'+
		'<p>{{subheadingText}}</p>'+
		'<div class="pcl-pdbRedo-row">'+
			'<div class="pcl-pdbRedo-label">Model Geometry</div>'+
			'<div class="pcl-pdbRedo-gradient" ng-show="showGeometry">&nbsp;</div>'+
			'<div class="pcl-pdbRedo-position-frame" ng-style="styles.geometryFrame" ng-show="showGeometry">&nbsp;</div>'+
			'<div class="pcl-pdbRedo-error" ng-hide="showGeometry">Data not available</div>'+
		'</div>'+
		'<div class="pcl-pdbRedo-row">'+
			'<div class="pcl-pdbRedo-label">Fit model/data</div>'+
			'<div class="pcl-pdbRedo-gradient" ng-show="showModelFit">&nbsp;</div>'+
			'<div class="pcl-pdbRedo-position-frame" ng-style="styles.modelFitFrame" ng-show="showModelFit">&nbsp;</div>'+
			'<div class="pcl-pdbRedo-error" ng-hide="showModelFit">Data not available</div>'+
		'</div>'+
		'<div class="pcl-pdbRedo-link-row">'+
			'<a target="_blank" href="http://www.cmbi.ru.nl/pdb_redo/cgi-bin/redir2.pl?pdbCode={{pdbId}}">PDB_REDO</a>'+
		'</div>'+
	'</div>'+
	'<div ng-hide="showWrapper">{{errorMsg}}</div>');
}]);