document.addEventListener('DOMContentLoaded', function() {
  const toggleExtension = document.getElementById('toggleExtension');
  const notesList = document.getElementById('notesList');
  const noteTitle = document.getElementById('noteTitle');
  const noteCover = document.getElementById('noteCover');
  const exportTxtBtn = document.getElementById('exportTxt');
  const exportPdfBtn = document.getElementById('exportPdf');
  const clearNotesBtn = document.getElementById('clearNotes');
  const notesContainer = document.getElementById('notesContainer');
  const emptyState = document.getElementById('emptyState');

  // Load extension state and notes
  chrome.storage.local.get(['isActive', 'notes', 'title', 'cover'], function(data) {
    toggleExtension.checked = data.isActive || false;
    noteTitle.value = data.title || '';
    noteCover.value = data.cover || '';
    
    if (data.notes && data.notes.length > 0) {
      renderNotes(data.notes);
      emptyState.classList.add('hidden');
      notesContainer.classList.remove('hidden');
    } else {
      emptyState.classList.remove('hidden');
      notesContainer.classList.add('hidden');
    }
  });

  // Toggle extension state
  toggleExtension.addEventListener('change', function() {
    const isActive = this.checked;
    chrome.storage.local.set({ isActive });
    
    // Send message to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "toggleExtension", isActive});
    });
  });

  // Save title and cover when changed
  noteTitle.addEventListener('change', function() {
    chrome.storage.local.set({ title: this.value });
  });

  noteCover.addEventListener('change', function() {
    chrome.storage.local.set({ cover: this.value });
  });

  // Export as TXT
  exportTxtBtn.addEventListener('click', exportNotes.bind(null, 'txt'));

  // Export as PDF
  exportPdfBtn.addEventListener('click', exportNotes.bind(null, 'pdf'));

  // Clear all notes
  clearNotesBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to delete all notes?')) {
      chrome.storage.local.set({ notes: [], title: '', cover: '' }, function() {
        noteTitle.value = '';
        noteCover.value = '';
        notesList.innerHTML = '';
        emptyState.classList.remove('hidden');
        notesContainer.classList.add('hidden');
      });
    }
  });

  // Listen for new notes added
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "newNote") {
      chrome.storage.local.get(['notes', 'title', 'cover'], function(data) {
        const notes = data.notes || [];
        notes.push({
          text: request.text,
          timestamp: request.timestamp,
          url: request.url
        });
        
        chrome.storage.local.set({ notes }, function() {
          renderNotes(notes);
          emptyState.classList.add('hidden');
          notesContainer.classList.remove('hidden');
        });
      });
    }
  });

  // Render notes in the popup
  function renderNotes(notes) {
    notesList.innerHTML = '';
    
    notes.forEach((note, index) => {
      const noteElement = document.createElement('div');
      noteElement.className = 'note-item';
      
      const noteText = document.createElement('div');
      noteText.className = 'note-text';
      noteText.textContent = `${index + 1}. ${note.text}`;
      
      const noteTime = document.createElement('div');
      noteTime.className = 'note-time';
      noteTime.textContent = formatTimestamp(note.timestamp);
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-note';
      deleteBtn.textContent = '✕';
      deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        deleteNote(index);
      });
      
      noteElement.appendChild(noteText);
      noteElement.appendChild(noteTime);
      noteElement.appendChild(deleteBtn);
      notesList.appendChild(noteElement);
    });
  }

  // Delete a single note
  function deleteNote(index) {
    chrome.storage.local.get(['notes'], function(data) {
      const notes = data.notes || [];
      notes.splice(index, 1);
      
      chrome.storage.local.set({ notes }, function() {
        renderNotes(notes);
        if (notes.length === 0) {
          emptyState.classList.remove('hidden');
          notesContainer.classList.add('hidden');
        }
      });
    });
  }

  // Export notes to file
  function exportNotes(format) {
    chrome.storage.local.get(['notes', 'title', 'cover', 'isActive'], function(data) {
      if (!data.notes || data.notes.length === 0) {
        alert('No notes to export!');
        return;
      }
      
      let content = `📘 Title: ${data.title || 'Untitled'}\n`;
      content += `📙 Cover: ${data.cover || 'No cover specified'}\n\n`;
      content += '📝 Notes:\n';
      
      data.notes.forEach((note, index) => {
        content += `${index + 1}. ${note.text}\n`;
        content += `   🕒 ${formatTimestamp(note.timestamp)}\n\n`;
      });
      
      const currentDate = new Date();
      content += `\n📅 Exported On: ${formatTimestamp(currentDate)}\n`;
      content += `🔗 Source: ${data.notes[0].url || 'Unknown source'}\n`;
      
      if (format === 'txt') {
        downloadFile(content, 'text/plain', `${data.title || 'notes'}.txt`);
      } else if (format === 'pdf') {
        // For PDF generation, we'll use a simple approach
        // In a production app, you might want to use a library like jsPDF
        const pdfContent = {
          content: [
            { text: data.title || 'Untitled', style: 'header' },
            { text: data.cover || 'No cover specified', style: 'subheader' },
            { text: 'Notes:', style: 'section' },
            ...data.notes.map((note, index) => ({
              text: [
                { text: `${index + 1}. `, bold: true },
                note.text,
                { text: `\nTimestamp: ${formatTimestamp(note.timestamp)}`, italics: true, fontSize: 10 }
              ],
              margin: [0, 0, 0, 10]
            })),
            { text: `Exported On: ${formatTimestamp(currentDate)}`, fontSize: 10 },
            { text: `Source: ${data.notes[0].url || 'Unknown source'}`, fontSize: 10 }
          ],
          styles: {
            header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
            subheader: { fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
            section: { fontSize: 12, bold: true, margin: [0, 10, 0, 5] }
          }
        };
        
        // This is a placeholder - in a real app, you'd use jsPDF or similar
        alert('PDF export would be implemented here with a library like jsPDF');
        console.log('PDF content:', pdfContent);
        return;
      }
      
      // Turn off extension after export
      chrome.storage.local.set({ isActive: false }, function() {
        toggleExtension.checked = false;
      });
    });
  }

  // Helper function to format timestamp
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    
    return `${day}/${month}/${year} | ${hours}:${minutes} ${ampm}`;
  }

  // Helper function to download file
  function downloadFile(content, mimeType, filename) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
});