module.exports = function(grunt) {

	// The web-root
	var webRoot			= "../";

	// The build directory relative to the web-root
	var build			= "build/";

	// Get script tags
	function getInitialScripts(){
		var index			= grunt.file.read("../index.html");
		var matchReg		= /<script.+?src=.+?<\/script>/g;
		var scriptTags		= index.match(matchReg);
		var scriptUrls		= [];
		scriptTags.forEach(function(item, i){
			var srcReg		= /src="(.+?)"/g;
			var matches		= srcReg.exec(item);
			scriptUrls.push(matches[1]);
		});
		return scriptUrls;
	}


	// Project configuration
	grunt.initConfig({
		// Karma config used to run karma build test runner harness in the grunt environment
		karma : {
			unit : {
				options :{
					// Build the list of files from the fileRegister and add some test files
					files: getInitialScripts().concat([
						"bower_components/angular-mocks/angular-mocks.js",
						"app/**/*-test.js",
						{pattern:"app/**/*.html", included:false}
					]),

					// base path that will be used to resolve all patterns (eg. files, exclude)
					basePath: "",

					// frameworks to use
					frameworks: ["jasmine-jquery", "jasmine"],

					// Both of reporters are custom plugins:
					// junit - used to generate an XML report that can be used by jenkins
					// karma-spec-reporter - used to generate a friendly output in the console
					reporters: ["junit", "spec"],
					junitReporter: {
						outputDir: "build/reports", // results will be saved as $outputDir/$browserName.xml
						outputFile: "js-unit-test-results.xml"
					},

					port: 9876,
					colors: true,

					// level of logging
					// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
					logLevel: "INFO",

					// enable / disable watching file and executing tests whenever any file changes
					autoWatch: true,

					// start these browsers. available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
					browsers: ["PhantomJS"],

					// Continuous Integration mode if true, Karma captures browsers, runs the tests and exits
					singleRun: true
				}
			}
		}
	});


	// Load the plugins
	require("load-grunt-tasks")(grunt);

	// Set base
	grunt.file.setBase(webRoot);

	grunt.registerTask("default", ["karma"]);
};