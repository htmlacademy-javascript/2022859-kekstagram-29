import { renderThumbnail } from './gallery.js';
import { createPostsData } from './data.js';
import { renderGallery } from './modal.js';
import {initImage } from './form-validator/form.js';

const arrayPost = createPostsData();
renderThumbnail(arrayPost);
renderGallery(arrayPost);
initImage();
