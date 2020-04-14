// const request = (options) => {
//     const headers = new Headers({
//         'Content-Type' : 'application/json'
//     })

//     if(localStorage.getItem('access-token')){
//         headers.append('Authorization', 'Bearer ' + localStorage.getItem('access-token'));
//     }

//     const defaults = {headers : headers}
//     options = Object.assign({}, defaults, options);

//     return fetch(options.url, options);
// }

// export function login(loginRequest) {
//     return request({
//         url: "/api/signin",
//         method: 'POST',
//         body: JSON.stringify(loginRequest)
//     })
// }
