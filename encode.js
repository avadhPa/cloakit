const imageUpload = document.getElementById('image-upload');
const secretText = document.getElementById('secret-text');
const encodeBtn = document.getElementById('encode-btn');
const downloadLink = document.getElementById('download-link');

encodeBtn.addEventListener('click', () => {
  const file = imageUpload.files[0];
  const message = secretText.value;

  if (!file || !message) {
    alert('Please upload an image and enter a secret message.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const binaryMessage = textToBinary(message);

      let index = 0;
      for (let i = 0; i < data.length; i += 4) {
        for (let j = 0; j < 3; j++) {
          if (index < binaryMessage.length) {
            const bit = parseInt(binaryMessage[index]);
            data[i + j] = (data[i + j] & 0xFE) | bit;
            index++;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      downloadLink.href = canvas.toDataURL();
      downloadLink.classList.remove('hidden');
    };
  };
  reader.readAsDataURL(file);
});
document.getElementById('image-upload').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    showNotification('Image uploaded successfully!');
  }
});

document.getElementById('encode-btn').addEventListener('click', function () {
  // Simulate encoding process
  setTimeout(() => {
    const downloadLink = document.getElementById('download-link');
    downloadLink.classList.remove('hidden');
    downloadLink.classList.add('bounce');
    showNotification('Image encoded and ready to download!');
  }, 3000); // Simulate a 3-second encoding process
});

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 5000); // Remove notification after 5 seconds
}