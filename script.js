const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);

    img.src = url;
  });
}

// Main function to download all images
function downloadImages() {
  output.innerHTML = "";
  errorBox.innerHTML = "";
  loading.classList.remove("hidden");

  const downloadPromises = images.map(obj => downloadImage(obj.url));

  Promise.all(downloadPromises)
    .then(downloadedImages => {
      loading.classList.add("hidden");

      downloadedImages.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(err => {
      loading.classList.add("hidden");
      errorBox.innerText = err;
    });
}

btn.addEventListener("click", downloadImages);
