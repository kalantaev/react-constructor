const agent = new XMLHttpRequest();
// export const API_ROOT = 'http://localhost:8080/api';
export const API_ROOT = 'http://37.140.198.217:8080';
const encode = encodeURIComponent;
const responseBody = res => res.body;


let request = obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.timeout = 4000;
        xhr.open(obj.method || "GET", obj.url);
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                (obj.method === 'DELETE') ? resolve() :
                    obj.method === 'POST' ? resolve(xhr.response ? {body: JSON.parse(xhr.response)} : {}) :
                        obj.notJson ? resolve(xhr.response) : resolve(JSON.parse(xhr.response));
            } else {
                reject(JSON.parse(xhr.response));
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(JSON.stringify(obj.body));
    });
};


let rqFile = (url, file) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.file = file; // not necessary if you create scopes like this
        xhr.addEventListener('progress', function (e) {
            var done = e.position || e.loaded, total = e.totalSize || e.total;
            // console.log('xhr progress: ' + (Math.floor(done / total * 1000) / 10) + '%');
        }, false);
        if (xhr.upload) {
            xhr.upload.onprogress = function (e) {
                var done = e.position || e.loaded, total = e.totalSize || e.total;
                // console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done / total * 1000) / 10) + '%');
            };
        }
        xhr.onreadystatechange = function (e) {
            if (4 == this.readyState) {
                // console.log(['xhr upload complete', e]);
            }
        };
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.open('post', url, true);
        // xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(file);
    });
};

const requests = {
    del: url =>
        request({url: `${API_ROOT}${url}`}).then(responseBody),
    get: (url, notJson) =>
        request({url: `${API_ROOT}${url}`, notJson: notJson}).then(responseBody=> responseBody),
    put: (url, body) =>
        request({
            method: "PUT",
            url: `${API_ROOT}${url}`,
            body: body,
            headers: {"content-type": 'application/json'}
        }).then(responseBody),
    post: (url, body) =>
        request({
            method: "POST",
            url: `${API_ROOT}${url}`,
            body: body,
            headers: {'content-type': 'application/json'}
        }).then(responseBody),
    delete: (url) =>
        request({
            method: "DELETE",
            url: `${API_ROOT}${url}`
        }).then(() => {
        }),
    file: (url, body) =>
        rqFile(`${API_ROOT}${url}`, body)
};

export function publicSettings() {
    return requests.get(`/getSettings`)
}

export function getBaseConfigFromServer() {
    return requests.get(`/base-config`)
}
export function getAllElementsFromServer() {
    return requests.get(`/getAllElement`)
}


