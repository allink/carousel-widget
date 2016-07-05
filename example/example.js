import 'style.less';
import GalleryGrid from 'app';

var gallery_instance = document.getElementById('example-gallery');
var gallery_options = {
    disable_show_animation: true,
    items_per_page: 4,
};
new GalleryGrid(gallery_instance,gallery_options);
