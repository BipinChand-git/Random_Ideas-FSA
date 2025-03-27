import axios from 'axios';

class IdeasApi {
    constructor() {
        this._apiUrl = 'http://localhost:5000/api/ideas';
    }

    getIdeas() {
        return axios.get(this._apiUrl);
    }

    createIdeas(data) {
        return axios.post(this._apiUrl, data);
    }

    updateIdea(id, data) {
        return axios.put(`${this._apiUrl}/${id}`, data);
    }

    deleteIdeas(id) {
        return axios.delete(`${this._apiUrl}/${id}`);
    }
}

export default new IdeasApi();