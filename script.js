

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.items');
  const items = document.querySelectorAll('.item');
  let draggedItem = null;

  items.forEach(item => {
    item.addEventListener('mousedown', () => {
      draggedItem = item;
      item.style.opacity = '0.5';
    });

    item.addEventListener('mouseup', () => {
      item.style.opacity = '1';
      draggedItem = null;
    });
  });

  container.addEventListener('mousemove', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientX, e.clientY);
    if (afterElement == null) {
      container.appendChild(draggedItem);
    } else {
      container.insertBefore(draggedItem, afterElement);
    }
  });

 
  function getDragAfterElement(container, x, y) {
    const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
}); 
    



 
    
