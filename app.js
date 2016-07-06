import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

class GalleryGrid {
    constructor(gallery_grid, options) {
        this.options = options || {};
        this.gallery_grid = gallery_grid;
        this.gallery_list_container = this.gallery_grid.querySelector('.gallery-list-container');
        this.gallery_items = [...this.gallery_list_container.children];
        this.controls = [...this.gallery_grid.querySelectorAll('.controls')];
        this.prev_btns = [...this.gallery_grid.querySelectorAll('.controls .prev')];
        this.next_btns = [...this.gallery_grid.querySelectorAll('.controls .next')];
        this.pages = null;
        this.current_page = null;
        this.page_numbers = this.gallery_grid.querySelectorAll('.page-number');
        this.index = 0;
        this.index_before = -1;
        this.items_per_page = this.options.items_per_page || 12;

        this.init();
    }

    init() {
        // first of all, grab all gallery items and divide into list..
        this.pages = this.divideListIntoPages();
        // ..then define the current page
        this.current_page = this.pages[0];

        (this.prev_btns).map((value) => {
            value.addEventListener('click', (event) => {
                event.preventDefault();
                this.updatedPages(-1);
            });
        });

        (this.next_btns).map((value) => {
            value.addEventListener('click', (event) => {
                event.preventDefault();
                this.updatedPages(1);
            });
        });

       this.updatedPages(0);

        // create separate lists according to setting

        (this.controls).map((value) => {
            value.style.display = 'block';
        });

        var me = this;

        new PhotoSwipeGallery({
            element: this.gallery_grid,
            disable_show_animation: this.options.disable_show_animation,
            item_selector: '.gallery-list-container a',
            after_change: (gallery) => {
                this.goToPage(Math.floor((gallery.getCurrentIndex() / me.items_per_page)));
            }
        });
    }

    divideListIntoPages() {
        var counter = 0,
            pages = [];

        // create first list
        let ul = document.createElement('ul');

        // loop through gallery items
        (this.gallery_items).map((value, index) => {
            // init
            counter++;
            // create list item and append to list
            let li = document.createElement('li');
            li.appendChild(value);
            ul.appendChild(li);

            // finally append list to container
            if(counter == this.options.items_per_page) {
                counter = 0;
                this.gallery_list_container.appendChild(ul);
                // add list to pages array..
                pages.push(ul);
                // ..and create new list we can append childs to
                ul = document.createElement('ul');
            }
            // last element
            else if(index == this.gallery_items.length - 1) {
                this.gallery_list_container.appendChild(ul);
                pages.push(ul);
            }
        });

        return pages;
    }

    updatedPages(offset) {
        this.index += offset;
        this.goToPage(this.index);
    }

    goToPage(index) {
        index = index < 0 ? 0 : index;
        index = index >= this.pages.length ? this.pages.length - 1 : index;
        this.index = index;

        if(this.index_before != index) {
            this.current_page = this.pages[index];

            // this.pages.not(this.current_page).hide();
            (this.pages).map((value) => {
                value.style.display = value != this.current_page ? 'none' : 'block';
            });

            this.current_page.style.display = 'block';

            ([...this.page_numbers]).map((value) => {
                value.innerHTML = (index + 1) + ' / ' + this.pages.length;
            });

            this.index_before = index;
        }
    }
}

class PhotoSwipeGallery {
    constructor(options) {
        this.options = options;
        this.item_selector = this.options.item_selector || 'a';

        this.element = this.options.element;
        this.init();
    }

    init() {
        this.child_nodes = [...this.element.querySelectorAll(this.item_selector)];

        this.child_nodes.map((value) => {
            value.addEventListener('click', (event) => {
                this.onThumbnailsClick(event, this);
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

    parseThumbnailElements() {
        var numNodes = this.child_nodes.length,
            items = [],
            element,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {
            element = this.child_nodes[i];

            size = element.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: element.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };

            if(element.children.length > 0) {
                // item.msrc = element.children[0].getAttribute('src');
            }

            item.el = element;
            items.push(item);
        }

        return items;
    }

    onThumbnailsClick(event, self) {
        event.preventDefault();
        // find root element of slide

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var nodeIndex = 0,
            index;
        for (var i = 0; i < this.child_nodes.length; i++) {
            if(this.child_nodes[i] === event.target.parentNode) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }

        if(index >= 0) {
            // open PhotoSwipe if valid index found
            this.openPhotoSwipe(index);
        }
        return false;
    }

    openPhotoSwipe(index, disableAnimation, fromURL) {
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

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }
        };

        // Disable SHOW animation
        if(this.options.disable_show_animation) {
            options.showAnimationDuration = 0;
        }

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
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
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        if(this.options.after_change) {
            gallery.listen('afterChange', (event) => {
                this.options.after_change(gallery);
            });
        }
        gallery.init();
    }

    photoswipeParseHash() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    }
}

export default GalleryGrid;
