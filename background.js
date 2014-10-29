(function (chrome) {
  'use strict';

  var width = 450;
  var height = 650;

  chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('app/index.html', {
      'bounds': {
        'width': width,
        'height': height,
        'left': Math.round((screen.availWidth - width) / 2),
        'top': Math.round((screen.availHeight - height) / 2)
      }
    });
  });
})(chrome);
