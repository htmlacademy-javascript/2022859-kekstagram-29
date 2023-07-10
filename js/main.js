import { renderThumbnail } from './gallery.js';
import { createPostsData } from './data.js';
import { renderGallery } from './modal.js';
import './form.js';

const arrayPost = createPostsData();
renderThumbnail(arrayPost);
renderGallery(arrayPost);


