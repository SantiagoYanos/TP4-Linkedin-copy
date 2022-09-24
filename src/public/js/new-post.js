const body = document.getElementById("post-show-description");

const bodyInput = document.getElementById("description");

bodyInput.addEventListener("change", () => {
  body.innerHTML = bodyInput.value;

  console.log(body.value);
});

const postPhoto = document.getElementById("post-show-photo");

const photoInput = document.getElementById("multimedia");

photoInput.addEventListener("change", () => {
  postPhoto.src = photoInput.value;
});
