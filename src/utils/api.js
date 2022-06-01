class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  setNewCard(newdata) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newdata.namePlace,
        link: newdata.linkPlace
      })
    })
    .then(res => {
     return this._getResponseData(res);
    })
  }
  
  deleteUserCard(idCard) {
    return fetch(`${this._baseUrl}cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
     return this._getResponseData(res);
    })
  }

  changeLikeCardStatus(idCard, isLiked) {
    if(isLiked) {
      return fetch(`${this._baseUrl}cards/${idCard}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(res => {
       return this._getResponseData(res);
      })
    } else {
      return fetch(`${this._baseUrl}cards/${idCard}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => {
       return this._getResponseData(res);
      })
    }
  }


  getUserInfo() {
   return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
    .then(res => {
     return this._getResponseData(res);
    })
  }
  setNewUserAvatar(newAvatarLink) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarLink})
    })
    .then(res => {
     return this._getResponseData(res);
    })
  }

  setNewUserInfo(newValues) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newValues.name,
        about: newValues.about
      })
    })
    .then(res => {
     return this._getResponseData(res);
    })
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-40/',
  headers: {
    authorization: 'f4ccf291-bfa6-4f7d-8768-52c052475176',
    'Content-Type': 'application/json'
  }
});

export default api;