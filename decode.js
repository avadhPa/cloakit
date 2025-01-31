const encodedImageUpload = document.getElementById('encoded-image-upload');
const decodeBtn = document.getElementById('decode-btn');
const decodedText = document.getElementById('decoded-text');

decodeBtn.addEventListener('click', () => {
  const file = encodedImageUpload.files[0];

  if (!file) {
    alert('Please upload an encoded image.');
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

      let binaryMessage = '';
      for (let i = 0; i < data.length; i += 4) {
        for (let j = 0; j < 3; j++) {
          binaryMessage += (data[i + j] & 1).toString();
        }
      }

      // Convert binary message to text
      const message = binaryToText(binaryMessage);
      decodedText.value = message; // Display the decoded message in the textarea
      showNotification('Message decoded successfully!'); // Notify the user
    };
  };
  reader.readAsDataURL(file);
});

// Function to convert binary to text
function binaryToText(binary) {
  let text = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    text += String.fromCharCode(parseInt(byte, 2));
  }
  return text;
}

// Notification system
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 5000); // Remove notification after 5 seconds
}

// Notify user when an image is uploaded
encodedImageUpload.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    showNotification('Encoded image uploaded successfully!');
  }
});