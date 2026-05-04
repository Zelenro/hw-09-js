const formRef = document.querySelector('form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

function handlerForm(e) {
  e.preventDefault();
  // console.log(e.target);
  const formData = new FormData(e.target);
  const formValues = Object.fromEntries(formData.entries());
  console.log(formValues);

  createPromise();
}

formRef.addEventListener('submit', handlerForm);
