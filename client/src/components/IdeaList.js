import IdeasApi from "../services/ideaApi";

class IdeaList {
    constructor() {
        this._ideaListEl = document.querySelector('#idea-list');
        this._ideas = [];
        this.getIdeas();
        this._validTags = new Set();
        this._validTags.add('technology');
        this._validTags.add('software');
        this._validTags.add('business');
        this._validTags.add('health');
        this._validTags.add('education');
        this._validTags.add('inventions');   
    }

    addEventListeners() {
        this._ideaListEl.addEventListener('click', (e) => {
            if(e.target.classList.contains('fa-times')) {
                e.stopImmediatePropagation();
                const ideaId = e.target.parentElement.parentElement.dataset.id;
                this.deleteIdea(ideaId);
            } 
        })
    }

    async getIdeas() {
        try {
            const res = await IdeasApi.getIdeas();
            this._ideas = res.data.data;  //second data refers to our backend data i.e ideas
            this.render();
        }
        catch(error) {
            console.log(error);
        }
    }

    async deleteIdea(ideaId) {
        try {
            // Delete from server-
            const res = await IdeasApi.deleteIdeas(ideaId);
            // Delete from DOM-
            this._ideas.filter((idea) => idea.id !== ideaId);
            this.getIdeas();
        }
        catch(error) {
            alert("You can't delete this resource.");
        }
    }

    addIdeaToList(idea) {
        try {
            this._ideas.push(idea);
            this.render();
        }
        catch(error) {
            console.log(error);
        }
        
    }

    getTagClass(tag) { 
        tag = tag.toLowerCase();
        return this._validTags.has(tag) ? `tag-${tag}` : `tag-default`;
    }

    render() {
        this._ideaListEl.innerHTML = '';
        this._ideas = this._ideas.map((idea) => {
            const tagClass = this.getTagClass(idea.tag);

            const div = document.createElement('div');
            div.setAttribute('class', 'card');
            div.setAttribute('data-id', idea._id);

            const button = document.createElement('button');
            button.classList.add('delete');
            button.innerHTML = '<i class="fas fa-times"></i>';

            const h3 = document.createElement('h3');
            h3.innerText = idea.text;

            const tagP = document.createElement('p');
            tagP.classList.add('tag', tagClass);
            tagP.innerText = idea.tag.toUpperCase();

            const userP = document.createElement('p');
            userP.innerHTML = `Posted on <span class="date">${idea.date}</span> by <span class="author">${idea.username}</span>`;

            idea.username === localStorage.getItem('username') ? div.appendChild(button) : null;
            div.appendChild(h3);
            div.appendChild(tagP);
            div.appendChild(userP);
            
            this._ideaListEl.appendChild(div);

        });
        this.addEventListeners();
    }
}

export default IdeaList;