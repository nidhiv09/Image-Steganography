// Hide data in image using LSB
function hideData() {
  let fileInput = document.getElementById("uploadImage");
  let message = document.getElementById("message").value;

  if (!fileInput.files[0] || !message) {
    alert("Please upload an image and enter a message!");
    return;
  }

  let reader = new FileReader();
  reader.onload = function(event) {
    let img = new Image();
    img.src = event.target.result;
    img.onload = function() {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;

      let binaryMessage = "";
      for (let i = 0; i < message.length; i++) {
        let binaryChar = message.charCodeAt(i).toString(2).padStart(8, '0');
        binaryMessage += binaryChar;
      }
      binaryMessage += "00000000"; // Null terminator

      for (let i = 0; i < binaryMessage.length; i++) {
        data[i] = (data[i] & 254) | parseInt(binaryMessage[i]);
      }

      ctx.putImageData(imageData, 0, 0);
      let stegoImage = canvas.toDataURL();

      document.getElementById("status").innerText = "✅ Data hidden successfully!";
      document.getElementById("downloadLink").innerHTML =
        `<a href="${stegoImage}" download="stego.png" class="btn">Download Stego Image</a>`;
    };
  };
  reader.readAsDataURL(fileInput.files[0]);
}

// Extract data from image
function extractData() {
  let fileInput = document.getElementById("stegoImage");
  if (!fileInput.files[0]) {
    alert("Please upload an image first!");
    return;
  }

  let reader = new FileReader();
  reader.onload = function(event) {
    let img = new Image();
    img.src = event.target.result;
    img.onload = function() {
      let canvas = document.getElementById("canvasExtract");
      let ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;

      let binaryMessage = "";
      for (let i = 0; i < data.length; i++) {
        binaryMessage += (data[i] & 1).toString();
      }

      let message = "";
      for (let i = 0; i < binaryMessage.length; i += 8) {
        let byte = binaryMessage.substr(i, 8);
        let charCode = parseInt(byte, 2);
        if (charCode === 0) break;
        message += String.fromCharCode(charCode);
      }

      document.getElementById("statusExtract").innerText =
        "✅ Data extracted successfully: " + message;
    };
  };
  reader.readAsDataURL(fileInput.files[0]);
}
