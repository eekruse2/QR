# QR Code Generator

A modern, user-friendly QR code generator web application that allows you to create QR codes from URLs, text, images, and PDFs. Built with vanilla JavaScript and features a beautiful, responsive design.

go to: qr-eight-nu.vercel.app

## Features

- Generate QR codes from:
  - URLs
  - Plain text
  - Images (automatically compressed)
  - PDF files (first page only)
- Modern, animated UI with a gradient background
- Local storage to save your recent QR codes
- View history of generated QR codes
- Download generated QR codes as PNG files
- Mobile-responsive design

## Usage

1. Visit the main page (`index.html`)
2. Enter a URL or text in the input field, or click "Alternative Options" to:
   - Enter plain text
   - Upload an image or PDF file (under 1MB)
3. Click "Generate QR Code"
4. Your QR code will be generated and saved automatically
5. View your recently generated QR codes in the "Current Gen" page

## Technical Details

- No external dependencies for core functionality
- Uses QRCode.js for QR code generation
- PDF.js for PDF processing
- Local storage for saving QR code history
- Automatic image/PDF compression to fit QR code size limitations
