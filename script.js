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

//xử lý button và form nhập

// Lấy các phần tử
const openFormButton = document.getElementById('openForm');
const closeFormButton = document.getElementById('closeForm');
const submitFormButton = document.getElementById('submitForm');
const confirmationForm = document.querySelector('.confirmation-form');
const nameInput = document.getElementById('nameInput');
const phoneNumberInput = document.getElementById('phoneNumberInput');
const thankYouForm = document.querySelector('.thank-you-form');
const closeThankYouButton = document.getElementById('closeThankYouForm');

const scriptURL = 'https://script.google.com/macros/s/AKfycbzGyCFsehgIANdHdfWIqIwRzgNG4D17DR6G6fQkv-mNdnQQStMwcS5wXpu0SnqIblmd/exec'

// Hiển thị form
openFormButton.addEventListener('click', () => {
  confirmationForm.classList.remove('hidden');
});

// Đóng form
closeFormButton.addEventListener('click', () => {
  confirmationForm.classList.add('hidden');
});

closeThankYouButton.addEventListener('click', () => {
  thankYouForm.classList.add('hidden');
})

// Xử lý khi nhấn Gửi
submitFormButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const phone = phoneNumberInput.value.trim();

  if (name && phone) {
    // Gửi dữ liệu tới Google Apps Script
    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify({ name, phone }),
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors'
    }).then(() => {
        
          // Ẩn form xác nhận và hiển thị form cảm ơn
          confirmationForm.classList.add('hidden');
          thankYouForm.classList.remove('hidden');

          // Xóa dữ liệu trong input
          nameInput.value = '';
          phoneNumberInput.value = '';
        }
      )
      .catch((error) => {
        alert('Không thể gửi dữ liệu. Vui lòng kiểm tra lại!');
        console.error('Error:', error);
      });
  } else {
    alert('Vui lòng nhập đầy đủ họ tên và số điện thoại!');
  }
});

