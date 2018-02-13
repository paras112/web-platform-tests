importScripts('/common/get-host-info.sub.js');
const host_info = get_host_info();

const multipart_image_path = '/service-workers/service-worker/resources/multipart-image.py';
const sameorigin_url = host_info['HTTPS_ORIGIN'] + multipart_image_path;
const cors_url = host_info['HTTPS_REMOTE_ORIGIN'] + multipart_image_path;

self.addEventListener('fetch', event => {
    if (event.request.url.indexOf('cross-origin-multipart-image-with-no-cors') >= 0) {
        event.respondWith(fetch(cors_url, {mode: 'no-cors'}));
    } else if (event.request.url.indexOf('cross-origin-multipart-image-with-cors') >= 0) {
        event.respondWith(fetch(cors_url, {mode: 'cors'}));
    } else if (event.request.url.indexOf('same-origin-multipart-image') >= 0) {
        event.respondWith(fetch(sameorigin_url));
    }
});
