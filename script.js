document.addEventListener('DOMContentLoaded', () => {
  let selectedCube = null;
  let offsetX = 0, offsetY = 0;

  const container = document.querySelector('.container');  // the bounding parent

  document.querySelectorAll('.cube').forEach(cube => {
    cube.style.position = 'absolute';  // ensure absolute positioning
    cube.addEventListener('mousedown', function(e) {
      e.preventDefault();
      selectedCube = this;
      // compute where inside the element the user clicked
      const rect = this.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      // Optionally bring to front / higher z-index
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

    // min and max positions *relative to container*
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

  document.addEventListener('mouseup', function(e) {
    if (selectedCube) {
      // reset z-index if you changed it
      selectedCube.style.zIndex = '';
    }
    selectedCube = null;
  });
});



 
    
