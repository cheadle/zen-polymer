(function(document) {
  'use strict';

  document.addEventListener('polymer-ready', function() {
    // Perform some behaviour
    console.log('Polymer is ready to rock!');
  });

  var DEFAULT_ROUTE = 'projects';

  var template = document.querySelector('template[is="auto-binding"]');
  var ajax, pages, scaffold;
  var cache = {};

  template.pages = [
    {name: 'Projects', hash: 'projects', url: 'elements/demo/projects.html'},
    {name: 'Orders', hash: 'orders', url: 'elements/demo/orders.html'},
    {name: 'Products', hash: 'products', url: 'elements/demo/products.html'}
  ];

  template.addEventListener('template-bound', function(e) {
    scaffold = document.querySelector('#scaffold');
    ajax = document.querySelector('#ajax');
    pages = document.querySelector('#pages');
    var keys = document.querySelector('#keys');

    // Allow selecting pages by num keypad. Dynamically add
    // [1, template.pages.length] to key mappings.
    var keysToAdd = Array.apply(null, template.pages).map(function(x, i) {
      return i + 1;
    }).reduce(function(x, y) {
      return x + ' ' + y;
    });
    keys.keys += ' ' + keysToAdd;

    this.route = this.route || DEFAULT_ROUTE; // Select initial route.
  });

  template.keyHandler = function(e, detail, sender) {
    // Select page by num key.
    var num = parseInt(detail.key);
    if (!isNaN(num) && num <= this.pages.length) {
      pages.selectIndex(num - 1);
      return;
    }

    switch (detail.key) {
      case 'left':
      case 'up':
        pages.selectPrevious();
        break;
      case 'right':
      case 'down':
        pages.selectNext();
        break;
      case 'space':
        detail.shift ? pages.selectPrevious() : pages.selectNext();
        break;
    }
  };

  template.menuItemSelected = function(e, detail, sender) {
    if (detail.isSelected) {

      // Need to wait one rAF so <core-ajax> has it's URL set.
      this.async(function() {
        // if (!cache[ajax.url]) {
        //   ajax.go();
        // }

        scaffold.closeDrawer();
      });

    }
  };

  template.cyclePages = function(e, detail, sender) {
    // If click was on a link, navigate and don't cycle page.
    if (e.path[0].localName == 'a') {
      return;
    }
    e.shiftKey ? sender.selectPrevious(true) :
                 sender.selectNext(true);
  };

  template.ajaxLoad = function(e, detail, sender) {
    e.preventDefault(); // prevent link navigation.
  };

  template.onResponse = function(e, detail, sender) {
    var article = detail.response.querySelector('scroll-area article');

    var pages = document.querySelector('#pages');
    this.injectBoundHTML(article.innerHTML,
                         pages.selectedItem.firstElementChild);
  };

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
