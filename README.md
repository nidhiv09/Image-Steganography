#  Image Steganography Web App

This is a simple **Image Steganography** web application built using **HTML, CSS, and JavaScript**.  
It allows users to **hide secret messages inside images** and later **extract hidden messages** from them using the **Least Significant Bit (LSB)** technique.

---

##  Features

- **Hide Data**: Embed secret text messages inside images securely.  
- **Extract Data**: Retrieve hidden messages from stego-images.  
- **User-Friendly UI**: Minimal, dark-themed design with styled buttons and inputs.  
- **Download Option**: Save the generated stego image after hiding data.  
- **No Backend Required**: 100% client-side, works offline in the browser.

---

##  How It Works

### 1️⃣ Hiding Data
- Upload an image and enter a secret message.
- The message is converted into binary.
- Each bit of the message is stored in the **least significant bit** of the image pixels.
- The modified image (stego image) can be downloaded.

### 2️⃣ Extracting Data
- Upload a stego image.
- The app reads the **least significant bits** of the pixels.
- Reconstructs the binary message until it finds a null terminator (`00000000`).
- Displays the extracted message.


