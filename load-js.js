var webPage = require('webpage'); // to open webpage
var page = webPage.create();

var fs = require('fs'); // to read/write files

var basePath = "/r-scrapers/"; 

var inFile = basePath + "test.html"; // created by our r script, contains source code for the page we want
var outFile = basePath + "fullHTML.html"; // output file

// link to webpage we want. if you want to pass this in from your r script, consider using the phantom system module 
// to pass it in through the command line: http://phantomjs.org/api/system/
var weblink = "http://irwm.rmcwater.com/sd/prj_master.php?cmd=preview&frm_id=1&uid=638&frmInst_id=1622"; 

// loads the js in the page source
function loadJS(page) {
  var expectedContent = fs.read(inFile); // read page source from html file 
  var expectedLocation = weblink; // set page location to the link we want
  page.setContent(expectedContent, expectedLocation); // set page content to our page source & load javascript
}

// writes the full HTML to a file
function writeFullHTML(page) {
  var content = page.content; // the full HTML with all js loaded  
  fs.write(outFile,content,'w'); 
  console.log("Finished writing to output file."); 
}

// intercepts redirect
// most of the stuff below from phantomJS documentation examples. used for debugging
page.onNavigationRequested = function(url, type, willNavigate, main) {
  loadJS(page); 
  console.log('Trying to navigate to: ' + url);
  console.log('Caused by: ' + type);
  console.log('Will actually navigate: ' + willNavigate);
  console.log('Sent from the page\'s main frame: ' + main);
}

page.onLoadFinished = function(status) {
    console.log('Load Finished: ' + status);
};


page.onResourceError = function(resourceError) {
  console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
  console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
};

page.open(weblink, function(status) {
  console.log('Status: ' + status); 
  writeFullHTML(page); 
  phantom.exit(); 
});

