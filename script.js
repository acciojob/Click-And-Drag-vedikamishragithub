document.addEventListener('DOMContentLoaded', () => {
  let selectedCube = null;
  let offsetX = 0, offsetY = 0;

  const container = document.querySelector('.items');  

  document.querySelectorAll('.item').forEach(cube => {
    cube.addEventListener('mousedown', function(e) {
      e.preventDefault();
      selectedCube = this;
     
      const rect = this.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      
      this.style.zIndex = 1000;
    });
  });

  document.addEventListener('mousemove', function(e) {
    if (!selectedCube) return;
    e.preventDefault();

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    const containerRect = container.getBoundingClientRect();
    const cubeRect = selectedCube.getBoundingClientRect();

    const minX = containerRect.left;
    const minY = containerRect.top;
    const maxX = containerRect.left + containerRect.width - cubeRect.width;
    const maxY = containerRect.top + containerRect.height - cubeRect.height;

    if (newX < minX) newX = minX;
    if (newX > maxX) newX = maxX;
    if (newY < minY) newY = minY;
    if (newY > maxY) newY = maxY;

    const relativeX = newX - containerRect.left;
    const relativeY = newY - containerRect.top;

    selectedCube.style.left = relativeX + 'px';
    selectedCube.style.top = relativeY + 'px';
  });

  document.addEventListener('mouseup', function() {
    if (selectedCube) {
      selectedCube.style.zIndex = '';
    }
    selectedCube = null;
  });
});

 
    
