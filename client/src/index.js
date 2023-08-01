// import '@fortawesome/fontawesome-free/css/all.css';
import Modal from './components/Modal';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import './css/style.css';

// const modal = new Modal();
new Modal();
const ideaForm = new IdeaForm();
ideaForm.render();

// const ideaList = new IdeaList();
new IdeaList();
// ideaList.render(); // should be rendered in the IdeaList class now
