import IdeasApi from '../services/IdeasApi';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];
    this.getIdeas();

    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('business');
    this._validTags.add('software');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEventListeners() {
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();

        const ideaId = e.target.parentElement.parentElement.dataset.id;
        // console.log(ideaId);

        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data; // the last `data` is from server response ({success: true, data: ideas})
      this.render();
    } catch (err) {
      console.log();
    }
  }

  async deleteIdea(ideaId) {
    try {
      // Delete from server
      const res = await IdeasApi.deleteIdea(ideaId);

      this._ideas.filter((idea) => idea._id !== ideaId); // will return all but the ideaId
      this.getIdeas();
    } catch (err) {
      alert('You cannot delete this resource');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';

    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = '';
    }

    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : '';

        // added data-id '_id' because MongoDB ids have _ (underscores)
        return `<div class="card" data-id="${idea._id}"> 
        ${deleteBtn}
        <h3>
          ${idea.text}
        </h3>
        <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
        <p>
          Posted on <span class="date">${idea.date}</span> by
          <span class="author">${idea.username}</span>
        </p>
      </div>`;
      })
      .join('');

    // placed eventlistener here since we don't want it to run when then browser loads
    this.addEventListeners();
  }
}

export default IdeaList;
