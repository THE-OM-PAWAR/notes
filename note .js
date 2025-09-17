// Note Taking App - Main JavaScript File
// DOM Elements
const elements = {
  container: document.getElementById("container"),
  addBtn: document.getElementById("add"),
  cancelBtn: document.getElementById("cnlBtn"),
  cancelBtn2: document.getElementById("cnlBtn2"),
  createBtn: document.getElementById("createbtn"),
  createBtn2: document.getElementById("createbtn2"),
  titleInput: document.getElementById("Nname"),
  contentInput: document.getElementById("value"),
  allNotesContainer: document.getElementById("allNote"),
  notePanel: document.getElementById("notePanel"),
  notePanel2: document.getElementById("notePanel2"),
  mainPanel: document.getElementById("main"),
  mainPanel2: document.getElementById("main2"),
  emptyState: document.getElementById("main__")
};

// Initialize panels as hidden
elements.mainPanel2.hidden = true;
elements.mainPanel.hidden = true;

// App State Management
const appState = {
  isFirstVisit: false,
  noteCount: 0,
  deleteCount: 0
};

// Show welcome modal on first visit
modal(
  "type1",
  "Welcome to Notes App",
  "A modern, responsive note-taking application. This Progressive Web App works offline and can be installed on your device. Built with vanilla HTML, CSS, and JavaScript.<br><br>Created in 2024 - Improved Version",
  "Get Started"
);

// Hide empty state initially
if (elements.emptyState) {
  elements.emptyState.style.display = "none";
}

// Event Listeners for Panel Controls
elements.cancelBtn.onclick = () => {
  elements.mainPanel.hidden = true;
  clearForm();
};

elements.cancelBtn2.onclick = () => {
  elements.mainPanel2.hidden = true;
};

// Utility Functions
function clearForm() {
  elements.titleInput.value = "";
  elements.contentInput.value = "";
}

function getCurrentTimestamp() {
  const now = new Date();
  const date = now.toDateString();
  const time = now.toTimeString();
  return `${date.slice(4, 10)} at ${time.slice(0, 5)}`;
}

function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Initialize App and Load Notes
function initializeApp() {
  appState.noteCount = localStorage.length;
  
  // Check if this is the first visit
  const hasVisited = localStorage.getItem("hasVisited");
  
  if (!hasVisited) {
    // First time user - add sample notes
    appState.isFirstVisit = true;
    localStorage.setItem("hasVisited", "true");
    
    const sampleNotes = [
      {
        title: "Welcome to Notes!",
        content: "This is your first note! You can create, edit, and delete notes easily. Click the + button to add a new note."
      },
      {
        title: "Tips for Better Note-Taking",
        content: "• Keep your notes organized with clear titles\n• Use the search feature to find notes quickly\n• Notes are automatically saved to your browser\n• The app works offline as a PWA"
      },
      {
        title: "Getting Started",
        content: "Try creating your own note by clicking the + button. You can edit any note by clicking on it, and delete notes using the trash icon."
      }
    ];
    
    sampleNotes.forEach(note => {
      const timestamp = getCurrentTimestamp();
      localStorage.setItem(note.title, timestamp + note.content);
    });
    
    if (elements.emptyState) {
      elements.emptyState.style.display = "flex";
    }
  }
  
  loadExistingNotes();
}

function loadExistingNotes() {
  appState.noteCount = localStorage.length;
  
  // Clear existing notes display
  elements.allNotesContainer.innerHTML = '';
  
  // Load all notes from localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const noteTitle = localStorage.key(i);
    
    // Skip system keys
    if (noteTitle === "hasVisited") continue;
    
    const noteData = localStorage.getItem(noteTitle);
    const timestamp = noteData.slice(0, 15);
    const content = noteData.slice(15);
    
    createNoteElement(noteTitle, content, timestamp);
  }
  
  // Show empty state if no notes
  if (localStorage.length <= 1) { // 1 for hasVisited key
    showEmptyState();
  }
}

// Create Note Function
elements.createBtn.onclick = () => {
  hideEmptyState();
  
  const title = elements.titleInput.value.trim();
  const content = elements.contentInput.value.trim();
  
  if (!title) {
    showAlert("Please provide a title for your note");
    return;
  }
  
  if (!content) {
    showAlert("Please add some content to your note");
    return;
  }
  
  // Check if note with same title exists
  if (localStorage.getItem(title)) {
    showAlert("A note with this title already exists");
    return;
  }
  
  const timestamp = getCurrentTimestamp();
  const noteData = timestamp + content;
  
  // Save to localStorage
  localStorage.setItem(title, noteData);
  
  // Clear form and hide panel
  clearForm();
  elements.mainPanel.hidden = true;
  
  // Create note element
  createNoteElement(title, content, timestamp);
  
  // Show success message
  modal("type2", "", "Note created successfully!", "OK", 2000);
};

function createNoteElement(title, content, timestamp) {
  const noteElement = document.createElement("div");
  noteElement.className = "note";
  noteElement.setAttribute("data-title", title);
  
  noteElement.innerHTML = `
    <div class="title">
      <h2>${sanitizeHTML(title)}</h2>
      <div class="delete" onclick="deleteNote(this)" title="Delete note">
        <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/>
        </svg>
      </div>
    </div>
    <div class="written" onclick="openNote(this)" title="Click to edit">
      <p class="timestamp" hidden>${timestamp}</p>
      <p class="content">${sanitizeHTML(content).replace(/\n/g, '<br>')}</p>
    </div>
  `;
  
  elements.allNotesContainer.prepend(noteElement);
}

// Add Note Button Handler
function showAddNotePanel() {
  hideEmptyState();
  clearForm();
  elements.mainPanel.hidden = false;
  elements.titleInput.focus();
}

elements.addBtn.addEventListener("click", showAddNotePanel);

// Utility Functions for UI State
function showEmptyState() {
  if (elements.emptyState) {
    elements.emptyState.style.display = "flex";
  }
}

function hideEmptyState() {
  if (elements.emptyState) {
    elements.emptyState.style.display = "none";
  }
}

function showAlert(message) {
  const alertElement = document.createElement("p");
  alertElement.id = "alerts";
  alertElement.className = "alert-message";
  alertElement.textContent = message;
  
  elements.titleInput.parentNode.insertBefore(alertElement, elements.titleInput);
  
  setTimeout(() => {
    if (alertElement.parentNode) {
      alertElement.remove();
    }
  }, 3000);
}

// Note Opening and Editing Functions
function openNote(element) {
  const noteElement = element.closest('.note');
  const title = noteElement.querySelector('.title h2').textContent;
  const content = element.querySelector('.content').textContent;
  const timestamp = element.querySelector('.timestamp').textContent;
  
  // Populate edit panel
  elements.notePanel2.querySelector('#times').textContent = timestamp;
  elements.notePanel2.querySelector('.Nname').textContent = title;
  elements.notePanel2.querySelector('.notepera').innerHTML = content.replace(/<br>/g, '\n');
  
  // Store original title for reference
  elements.notePanel2.setAttribute('data-original-title', title);
  
  elements.mainPanel2.hidden = false;
}

// Update Note Function
elements.createBtn2.onclick = () => {
  hideEmptyState();
  
  const originalTitle = elements.notePanel2.getAttribute('data-original-title');
  const newTitle = elements.notePanel2.querySelector('.Nname').textContent.trim();
  const newContent = elements.notePanel2.querySelector('.notepera').innerHTML.trim();
  
  if (!newTitle) {
    showAlert("Please provide a title for your note");
    return;
  }
  
  if (!newContent) {
    showAlert("Please add some content to your note");
    return;
  }
  
  // Remove old note if title changed
  if (originalTitle !== newTitle) {
    localStorage.removeItem(originalTitle);
    
    // Check if new title already exists
    if (localStorage.getItem(newTitle)) {
      showAlert("A note with this title already exists");
      return;
    }
  }
  
  const timestamp = getCurrentTimestamp();
  const noteData = timestamp + newContent.replace(/<br>/g, '\n').replace(/<div>/g, '\n').replace(/<\/div>/g, '');
  
  // Save updated note
  localStorage.setItem(newTitle, noteData);
  
  // Hide panel and reload notes
  elements.mainPanel2.hidden = true;
  loadExistingNotes();
  
  // Show success message
  modal("type2", "", "Note updated successfully!", "OK", 2000);
};

// Delete Note Functionality
let deletePermission = true;

function deleteNote(element) {
  hideEmptyState();
  
  const noteElement = element.closest('.note');
  const title = noteElement.getAttribute('data-title');
  
  // Add delete animation
  noteElement.style.transform = "scale(0)";
  noteElement.style.opacity = "0";
  
  // Create unique identifier for undo functionality
  appState.deleteCount++;
  const deleteId = `delete-${appState.deleteCount}`;
  noteElement.setAttribute('data-delete-id', deleteId);
  
  setTimeout(() => {
    noteElement.style.display = "none";
  }, 300);
  
  // Set timeout for permanent deletion
  const deleteTimeout = setTimeout(() => {
    if (deletePermission) {
      noteElement.remove();
      localStorage.removeItem(title);
      
      // Show empty state if no notes left
      if (localStorage.length <= 1) {
        showEmptyState();
      }
    }
  }, 5000);
  
  // Show undo modal
  modal(
    "type2",
    "",
    `Note "${title}" deleted. Click Undo to restore.`,
    "Undo",
    5000,
    "undoDelete",
    deleteId,
    deleteTimeout
  );
}

function undoDelete(deleteId, deleteTimeout) {
  const noteElement = document.querySelector(`[data-delete-id="${deleteId}"]`);
  
  if (noteElement) {
    // Clear the deletion timeout
    clearTimeout(deleteTimeout);
    
    // Restore note visibility
    noteElement.style.display = "flex";
    noteElement.style.transform = "scale(1)";
    noteElement.style.opacity = "1";
    
    // Remove delete identifier
    noteElement.removeAttribute('data-delete-id');
    
    modal("type2", "", "Note restored successfully!", "OK", 2000);
  }
}

// Search Functionality
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      filterNotes(searchTerm);
    });
  }
}

function filterNotes(searchTerm) {
  const notes = document.querySelectorAll('.note');
  let visibleCount = 0;
  
  notes.forEach(note => {
    const title = note.querySelector('.title h2').textContent.toLowerCase();
    const content = note.querySelector('.written .content').textContent.toLowerCase();
    
    if (title.includes(searchTerm) || content.includes(searchTerm)) {
      note.style.display = 'flex';
      visibleCount++;
    } else {
      note.style.display = 'none';
    }
  });
  
  // Show/hide empty state based on search results
  if (visibleCount === 0 && searchTerm) {
    showSearchEmptyState(searchTerm);
  } else if (visibleCount === 0 && !searchTerm) {
    showEmptyState();
  } else {
    hideEmptyState();
  }
}

function showSearchEmptyState(searchTerm) {
  hideEmptyState();
  
  let searchEmptyState = document.getElementById('search-empty-state');
  if (!searchEmptyState) {
    searchEmptyState = document.createElement('div');
    searchEmptyState.id = 'search-empty-state';
    searchEmptyState.className = 'empty-state';
    searchEmptyState.innerHTML = `
      <div class="empty-content">
        <h2>No Results Found</h2>
        <p>No notes match "${searchTerm}". Try a different search term.</p>
      </div>
    `;
    elements.allNotesContainer.appendChild(searchEmptyState);
  }
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + N to create new note
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      showAddNotePanel();
    }
    
    // Escape to close panels
    if (e.key === 'Escape') {
      if (!elements.mainPanel.hidden) {
        elements.cancelBtn.click();
      }
      if (!elements.mainPanel2.hidden) {
        elements.cancelBtn2.click();
      }
    }
    
    // Ctrl/Cmd + F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      e.preventDefault();
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.focus();
      }
    }
  });
}

// Note Sorting
function sortNotesByDate() {
  const notesArray = Array.from(document.querySelectorAll('.note'));
  
  notesArray.sort((a, b) => {
    const dateA = new Date(a.querySelector('.timestamp').textContent);
    const dateB = new Date(b.querySelector('.timestamp').textContent);
    return dateB - dateA; // Newest first
  });
  
  // Re-append sorted notes
  notesArray.forEach(note => {
    elements.allNotesContainer.appendChild(note);
  });
}

// Dark Mode Functionality
function initializeDarkMode() {
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }
  
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      sunIcon?.classList.add('hidden');
      moonIcon?.classList.remove('hidden');
    } else {
      sunIcon?.classList.remove('hidden');
      moonIcon?.classList.add('hidden');
    }
  }
}

// Initialize the application
initializeApp();
initializeSearch();
initializeKeyboardShortcuts();
initializeDarkMode();

