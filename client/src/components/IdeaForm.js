import IdeasApi from '../services/ideaApi';
import IdeaList from './IdeaList';

class IdeaForm {
    constructor() {
        this._formModal = document.querySelector('#form-modal');
        this._ideaList = new IdeaList();
    }
    
    addEventListeners() {
        this._form.addEventListener('submit', this.handleSubmit.bind(this));
    }
    
    async handleSubmit(e) {
        e.preventDefault();

        if(!this._form.elements.text.value || !this._form.elements.tag.value || !this._form.elements.username.value) {
            alert('Please Enter all the fields');
            return;
        }
    
        const idea =  {
            text : this._form.elements.text.value,
            tag : this._form.elements.tag.value,
            username : this._form.elements.username.value,
        }
        
        // Add Idea to the server-
        const newIdea = await IdeasApi.createIdeas(idea);

        // Add Idea to the list-
        this._ideaList.addIdeaToList(newIdea.data.data);

        // Save User to Local Storage-
        localStorage.setItem('username', this._form.elements.username.value);

        // Clear all fields-
        this._form.elements.text.value = '';
        this._form.elements.tag.value = '';
        this._form.elements.username.value = '';

        document.dispatchEvent(new Event('closeModal'));
    }

    render() {
        this._formModal.innerHTML = `
            <form id="idea-form">
                <div class="form-control">
                    <label for="username">Enter a Username</label>
                    <input type="text" name="username" id="username"
                    value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}">
                </div>
                <div class="form-control">
                    <label for="idea-text">Drop Your Ideas?</label>
                    <textarea name="text" id="idea-text"></textarea>
                </div>
                <div class="form-control">
                    <label for="tag">Tag</label>
                    <input type="text" name="tag" id="tag">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form> `;
        this._form = document.querySelector('#idea-form');
        this.addEventListeners();
    }
}

export default IdeaForm;