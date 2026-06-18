(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })

  // ==================== CUSTOM TOASTS AUTO-DISMISS ====================
  const toasts = document.querySelectorAll('.custom-toast');
  toasts.forEach(toast => {
    // Auto-dismiss after 4.5 seconds
    const timer = setTimeout(() => {
      dismissToast(toast);
    }, 4500);

    // Close button click
    const closeBtn = toast.querySelector('.custom-toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        clearTimeout(timer);
        dismissToast(toast);
      });
    }
  });

  function dismissToast(toast) {
    toast.classList.add('hide-animation');
    // Graceful removal after animation completes
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }
})();