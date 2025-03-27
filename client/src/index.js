import '@fortawesome/fontawesome-free/css/all.css';
import Modal from './components/Modal';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import './css/style.css';      // Importing our css file into our javascript--

const modal = new Modal();  //-to initialize it

const form = new IdeaForm();
form.render();

const ideaList = new IdeaList();
