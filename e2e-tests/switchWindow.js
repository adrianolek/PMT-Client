module.exports = function(cb) {
  setTimeout(function(){
    browser.driver.getAllWindowHandles().then(function(handles){
      browser.driver.switchTo().window(handles[1]).then(function(){
        cb();
      });
    });
  }, 1000);
};
