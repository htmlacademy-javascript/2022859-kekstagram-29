import { renderThumbnail } from './gallery.js';
import { renderGallery } from './modal.js';
import { setFormSubmit } from './form-validator/form.js';
import { getData, sendData } from './api.js';
import { debounce, showAlert } from './utils.js';
import { closeModalForm } from './upload.js';
import { showMessageError, showMessageSuccess } from './message.js';
import { initFilters } from './filters.js';
setFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModalForm();
    showMessageSuccess();
  } catch {
    showMessageError();
  }
});


try {
  const data = await getData();
  const debounceGallery = debounce(renderThumbnail);
  initFilters(data, debounceGallery);
  renderThumbnail(data);
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}

