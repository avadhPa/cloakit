// Utility function to convert text to binary
function textToBinary(text) {
    let binaryMessage = '';
    for (let i = 0; i < text.length; i++) {
      let binaryChar = text[i].charCodeAt(0).toString(2);
      binaryMessage += '0'.repeat(8 - binaryChar.length) + binaryChar;
    }
    return binaryMessage;
  }
  
  // Utility function to convert binary to text
  function binaryToText(binaryMessage) {
    let textMessage = "";
    for (let i = 0; i < binaryMessage.length; i += 8) {
      let byte = binaryMessage.substr(i, 8);
      textMessage += String.fromCharCode(parseInt(byte, 2));
    }
    return textMessage;
  }