// Add click event listeners to project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const link = card.getAttribute('data-link');
    if (link) {
      window.location.href = link;
    }
  });
});