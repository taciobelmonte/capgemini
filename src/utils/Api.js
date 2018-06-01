let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'crossDomain': true,
};

export const get = (url) =>{
    return fetch(`${url}`, { headers })
        .then(res => res.json())
        .then(data => data);
};
