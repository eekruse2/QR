# QR Code Generator

A modern web application for generating customizable QR codes with expiration options.

## Features

- Generate QR codes from URLs
- Customize QR code colors
- Choose between different styles (standard, rounded)
- Set expiration time for QR codes
- Download generated QR codes
- Modern, responsive UI

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/qr-code-generator.git
cd qr-code-generator
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the application:
```bash
python app.py
```

The application will be available at `http://localhost:5000`

## Deployment

This application can be deployed to Heroku:

1. Create a new Heroku app
2. Push the code to Heroku:
```bash
git push heroku main
```

## Usage

1. Enter the URL you want to encode in the QR code
2. Choose a color for the QR code
3. Select a style (standard or rounded)
4. Optionally set an expiration time in minutes
5. Click "Generate QR Code"
6. Download the generated QR code

## License

MIT License