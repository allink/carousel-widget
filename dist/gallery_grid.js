(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("photoswipe"), require("photoswipe/dist/photoswipe-ui-default"));
	else if(typeof define === 'function' && define.amd)
		define(["photoswipe", "photoswipe/dist/photoswipe-ui-default"], factory);
	else if(typeof exports === 'object')
		exports["GalleryGrid"] = factory(require("photoswipe"), require("photoswipe/dist/photoswipe-ui-default"));
	else
		root["GalleryGrid"] = factory(root["photoswipe"], root["photoswipe/dist/photoswipe-ui-default"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _photoswipe = __webpack_require__(1);

	var _photoswipe2 = _interopRequireDefault(_photoswipe);

	var _photoswipeUiDefault = __webpack_require__(2);

	var _photoswipeUiDefault2 = _interopRequireDefault(_photoswipeUiDefault);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var node_list_to_array = function node_list_to_array(node_list) {
	    var array_list = [];
	    for (var i = 0; i < node_list.length; i++) {
	        array_list.push(node_list[i]);
	    }

	    return array_list;
	};

	var GalleryGrid = function () {
	    function GalleryGrid(gallery_grid, options) {
	        _classCallCheck(this, GalleryGrid);

	        this.options = options || {};
	        this.gallery_grid = gallery_grid;
	        this.gallery_list_container = this.gallery_grid.querySelector('.gallery-list-container');
	        this.gallery_items = node_list_to_array(this.gallery_list_container.children);
	        this.controls = node_list_to_array(this.gallery_grid.querySelectorAll('.controls'));
	        this.prev_btns = node_list_to_array(this.gallery_grid.querySelectorAll('.controls .prev'));
	        this.next_btns = node_list_to_array(this.gallery_grid.querySelectorAll('.controls .next'));
	        this.pages = null;
	        this.current_page = null;
	        this.page_numbers = this.gallery_grid.querySelectorAll('.page-number');
	        this.index = 0;
	        this.index_before = -1;
	        this.items_per_page = this.options.items_per_page || 12;

	        this.init();
	    }

	    _createClass(GalleryGrid, [{
	        key: 'init',
	        value: function init() {
	            var _this = this;

	            // first of all, grab all gallery items and divide into list..
	            this.pages = this.divideListIntoPages();
	            // ..then define the current page
	            this.current_page = this.pages[0];

	            this.prev_btns.map(function (value) {
	                value.addEventListener('click', function (event) {
	                    event.preventDefault();
	                    _this.updatedPages(-1);
	                });
	            });

	            this.next_btns.map(function (value) {
	                value.addEventListener('click', function (event) {
	                    event.preventDefault();
	                    _this.updatedPages(1);
	                });
	            });

	            this.updatedPages(0);

	            // create separate lists according to setting

	            this.controls.map(function (value) {
	                value.style.display = 'block';
	            });

	            var me = this;

	            new PhotoSwipeGallery({
	                element: this.gallery_grid,
	                disable_show_animation: this.options.disable_show_animation,
	                item_selector: '.gallery-list-container a',
	                after_change: function after_change(gallery) {
	                    _this.goToPage(Math.floor(gallery.getCurrentIndex() / me.items_per_page));
	                }
	            });
	        }
	    }, {
	        key: 'divideListIntoPages',
	        value: function divideListIntoPages() {
	            var _this2 = this;

	            var counter = 0,
	                pages = [];

	            // create first list
	            var ul = document.createElement('ul');

	            // loop through gallery items
	            this.gallery_items.map(function (value, index) {
	                // init
	                counter++;
	                // create list item and append to list
	                var li = document.createElement('li');
	                li.appendChild(value);
	                ul.appendChild(li);

	                // finally append list to container
	                if (counter == _this2.options.items_per_page) {
	                    counter = 0;
	                    _this2.gallery_list_container.appendChild(ul);
	                    // add list to pages array..
	                    pages.push(ul);
	                    // ..and create new list we can append childs to
	                    ul = document.createElement('ul');
	                }
	                // last element
	                else if (index == _this2.gallery_items.length - 1) {
	                        _this2.gallery_list_container.appendChild(ul);
	                        pages.push(ul);
	                    }
	            });

	            return pages;
	        }
	    }, {
	        key: 'updatedPages',
	        value: function updatedPages(offset) {
	            this.index += offset;
	            this.goToPage(this.index);
	        }
	    }, {
	        key: 'goToPage',
	        value: function goToPage(index) {
	            var _this3 = this;

	            index = index < 0 ? 0 : index;
	            index = index >= this.pages.length ? this.pages.length - 1 : index;
	            this.index = index;

	            if (this.index_before != index) {
	                this.current_page = this.pages[index];

	                // this.pages.not(this.current_page).hide();
	                this.pages.map(function (value) {
	                    value.style.display = value != _this3.current_page ? 'none' : 'block';
	                });

	                this.current_page.style.display = 'block';

	                node_list_to_array(this.page_numbers).map(function (value) {
	                    value.innerHTML = index + 1 + ' / ' + _this3.pages.length;
	                });

	                this.index_before = index;
	            }
	        }
	    }]);

	    return GalleryGrid;
	}();

	var PhotoSwipeGallery = function () {
	    function PhotoSwipeGallery(options) {
	        _classCallCheck(this, PhotoSwipeGallery);

	        this.options = options;
	        this.item_selector = this.options.item_selector || 'a';

	        this.element = this.options.element;
	        this.init();
	    }

	    _createClass(PhotoSwipeGallery, [{
	        key: 'init',
	        value: function init() {
	            var _this4 = this;

	            this.child_nodes = node_list_to_array(this.element.querySelectorAll(this.item_selector));

	            this.child_nodes.map(function (value) {
	                value.addEventListener('click', function (event) {
	                    _this4.onThumbnailsClick(event, _this4);
	                });
	            });
	            // Parse URL and open gallery if it contains #&pid=3&gid=1
	            // TODO: not working yet
	            // var hashData = this.photoswipeParseHash();
	            //
	            // if(hashData.pid && hashData.gid) {
	            //     this.openPhotoSwipe(hashData.pid, true, true);
	            // }
	        }
	    }, {
	        key: 'parseThumbnailElements',
	        value: function parseThumbnailElements() {
	            var numNodes = this.child_nodes.length,
	                items = [],
	                element,
	                size,
	                item;

	            for (var i = 0; i < numNodes; i++) {
	                element = this.child_nodes[i];

	                size = element.getAttribute('data-size').split('x');

	                // create slide object
	                item = {
	                    src: element.getAttribute('href'),
	                    w: parseInt(size[0], 10),
	                    h: parseInt(size[1], 10)
	                };

	                if (element.children.length > 0) {
	                    // item.msrc = element.children[0].getAttribute('src');
	                }

	                item.el = element;
	                items.push(item);
	            }

	            return items;
	        }
	    }, {
	        key: 'onThumbnailsClick',
	        value: function onThumbnailsClick(event, self) {
	            event.preventDefault();
	            // find root element of slide

	            // find index of clicked item by looping through all child nodes
	            // alternatively, you may define index via data- attribute
	            var nodeIndex = 0,
	                index;
	            for (var i = 0; i < this.child_nodes.length; i++) {
	                if (this.child_nodes[i] === event.target.parentNode) {
	                    index = nodeIndex;
	                    break;
	                }
	                nodeIndex++;
	            }

	            if (index >= 0) {
	                // open PhotoSwipe if valid index found
	                this.openPhotoSwipe(index);
	            }
	            return false;
	        }
	    }, {
	        key: 'openPhotoSwipe',
	        value: function openPhotoSwipe(index, disableAnimation, fromURL) {
	            var _this5 = this;

	            var pswpElement = document.querySelectorAll('.pswp')[0],
	                gallery,
	                options,
	                items;

	            items = this.parseThumbnailElements();
	            // define options (if needed)
	            options = {
	                history: false,
	                // define gallery index (for URL)
	                // galleryUID: this.element.getAttribute('data-pswp-uid'),
	                closeEl: true,
	                captionEl: false,
	                fullscreenEl: false,
	                zoomEl: false,
	                shareEl: false,
	                counterEl: true,
	                arrowEl: true,
	                preloaderEl: false,
	                showHideOpacity: true,

	                getThumbBoundsFn: function getThumbBoundsFn(index) {
	                    // See Options -> getThumbBoundsFn section of documentation for more info
	                    var thumbnail = items[index].el.getElementsByTagName('img')[0],
	                        // find thumbnail
	                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
	                        rect = thumbnail.getBoundingClientRect();

	                    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
	                }
	            };

	            // Disable SHOW animation
	            if (this.options.disable_show_animation) {
	                options.showAnimationDuration = 0;
	            }

	            // PhotoSwipe opened from URL
	            if (fromURL) {
	                if (options.galleryPIDs) {
	                    // parse real index when custom PIDs are used
	                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
	                    for (var j = 0; j < items.length; j++) {
	                        if (items[j].pid == index) {
	                            options.index = j;
	                            break;
	                        }
	                    }
	                } else {
	                    // in URL indexes start from 1
	                    options.index = parseInt(index, 10) - 1;
	                }
	            } else {
	                options.index = parseInt(index, 10);
	            }

	            // exit if index not found
	            if (isNaN(options.index)) {
	                return;
	            }

	            if (disableAnimation) {
	                options.showAnimationDuration = 0;
	            }

	            // Pass data to PhotoSwipe and initialize it
	            gallery = new _photoswipe2.default(pswpElement, _photoswipeUiDefault2.default, items, options);
	            if (this.options.after_change) {
	                gallery.listen('afterChange', function (event) {
	                    _this5.options.after_change(gallery);
	                });
	            }
	            gallery.init();
	        }
	    }, {
	        key: 'photoswipeParseHash',
	        value: function photoswipeParseHash() {
	            var hash = window.location.hash.substring(1),
	                params = {};
	            if (hash.length < 5) {
	                return params;
	            }

	            var vars = hash.split('&');
	            for (var i = 0; i < vars.length; i++) {
	                if (!vars[i]) {
	                    continue;
	                }
	                var pair = vars[i].split('=');
	                if (pair.length < 2) {
	                    continue;
	                }
	                params[pair[0]] = pair[1];
	            }
	            if (params.gid) {
	                params.gid = parseInt(params.gid, 10);
	            }

	            return params;
	        }
	    }]);

	    return PhotoSwipeGallery;
	}();

	exports.default = GalleryGrid;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;