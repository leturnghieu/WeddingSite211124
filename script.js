const pages = document.querySelectorAll('.page');
let currentPage = 0;

function showNextPage() {
  if (currentPage < pages.length - 1) {
    pages[currentPage].classList.add('hidden');
    currentPage++;
    pages[currentPage].classList.remove('hidden');
    pages[currentPage].classList.add('visible');
  }
}

function showPreviousPage() {
  if (currentPage > 0) {
    pages[currentPage].classList.remove('visible');
    pages[currentPage].classList.add('hidden');
    currentPage--;
    pages[currentPage].classList.remove('hidden');
    pages[currentPage].classList.add('visible');
  }
}

// Set the initial state
pages.forEach((page, index) => {
  if (index === 0) {
    page.classList.add('visible');
  } else {
    page.classList.add('hidden');
  }
});

// Handle scrolling
window.addEventListener('wheel', (event) => {
  if (event.deltaY > 0) {
    showNextPage();
  } else {
    showPreviousPage();
  }
});

// Optional: For touch devices
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (event) => {
  touchStartY = event.touches[0].clientY;
});

window.addEventListener('touchend', (event) => {
  touchEndY = event.changedTouches[0].clientY;
  if (touchStartY - touchEndY > 50) {
    showNextPage();
  } else if (touchEndY - touchStartY > 50) {
    showPreviousPage();
  }
});

//xử lý phần số trang
const indicators = document.querySelectorAll('.indicator');

// Hàm cập nhật trạng thái của thanh chỉ số
function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index === currentPage) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Hàm chuyển đến trang bất kỳ
function goToPage(index) {
  if (index >= 0 && index < pages.length) {
    // Ẩn trang hiện tại
    pages[currentPage].classList.remove('visible');
    pages[currentPage].classList.add('hidden');

    // Cập nhật trang mới
    currentPage = index;
    pages[currentPage].classList.remove('hidden');
    pages[currentPage].classList.add('visible');

    // Cập nhật trạng thái của thanh chỉ số
    updateIndicators();
  }
}

// Xử lý sự kiện khi nhấn vào chỉ số page
indicators.forEach((indicator) => {
  indicator.addEventListener('click', () => {
    const pageIndex = parseInt(indicator.getAttribute('data-page'), 10);
    goToPage(pageIndex);
  });
});

// Cập nhật trạng thái ban đầu
updateIndicators();

function showNextPage() {
    if (currentPage < pages.length - 1) {
      pages[currentPage].classList.add('hidden');
      currentPage++;
      pages[currentPage].classList.remove('hidden');
      pages[currentPage].classList.add('visible');
      updateIndicators(); // Đồng bộ thanh chỉ số
    }
  }
  
  function showPreviousPage() {
    if (currentPage > 0) {
      pages[currentPage].classList.remove('visible');
      pages[currentPage].classList.add('hidden');
      currentPage--;
      pages[currentPage].classList.remove('hidden');
      pages[currentPage].classList.add('visible');
      updateIndicators(); // Đồng bộ thanh chỉ số
    }
  }
  