#file to write page source to 
outputFile = "test.html"
#webpage link
link = "http://irwm.rmcwater.com/sd/prj_master.php?cmd=preview&frm_id=1&uid=638&frmInst_id=1622"
#write page source to file 
download.file(link, outputFile, "curl", quiet = FALSE, mode = "w",
              cacheOK = TRUE,
              extra = "") #CURL'S DEFAULT IS TO NOT FOLLOW REDIRECTS OMG
#pass file to phantomjs to load the javascript 
system("phantomjs C:/Users/Masha/Documents/research_summer2016/r-scrapers/load-js.js") 
require("rvest") #for scraping
#file with all js loaded, created by phantom
HTMLfile = "C:/Users/Masha/Documents/research_summer2016/r-scrapers/fullHTML.html"
fullHTML =  read_html(HTMLfile)
nameNode = html_node(fullHTML, "#tx_contactName") #node containing the name
name = html_attr(nameNode, "value") 
#more info: https://www.datacamp.com/community/tutorials/scraping-javascript-generated-data-with-r#gs.BMAURAY

