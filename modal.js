const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");

  modalContent.classList.add("opacity-0", "scale-95");
  modalContent.classList.remove("opacity-100", "scale-100");

  setTimeout(() => {
    modalContent.classList.remove("opacity-0", "scale-95");
    modalContent.classList.add("opacity-100", "scale-100");
  }, 10);  
});

closeModalBtn.addEventListener("click", () => {
  modalContent.classList.remove("opacity-100", "scale-100");
  modalContent.classList.add("opacity-0", "scale-95");

  setTimeout(() => {
    modal.classList.add("hidden");
  }, 300); 
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modalContent.classList.remove("opacity-100", "scale-100");
    modalContent.classList.add("opacity-0", "scale-95");

    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  }
});
