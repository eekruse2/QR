document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url-input');
    const textInput = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrCodeContainer = document.getElementById('qr-code');

    // keep a reference to the generated canvas so we can download it later
    let currentCanvas = null;
    
    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);
    
    // Add event listeners for Enter key
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });
    
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });
    
    function generateQRCode() {
        const urlValue = urlInput.value.trim();
        const textValue = textInput.value.trim();
        
        if (!urlValue && !textValue) {
            alert('Please enter either a URL or text');
            return;
        }
        
        // Clear previous QR code
        qrCodeContainer.innerHTML = '';

        // Use URL if provided, otherwise use text
        const inputValue = urlValue || textValue;

        // create a canvas element for the QR code
        const canvas = document.createElement('canvas');

        // Generate new QR code on the canvas
        QRCode.toCanvas(canvas, inputValue, {
            width: 200,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, (error) => {
            if (error) {
                console.error(error);
                alert('Error generating QR code');
                return;
            }

            // append the canvas to the container
            qrCodeContainer.appendChild(canvas);

            // Enable download button and store canvas reference
            downloadBtn.disabled = false;
            currentCanvas = canvas;
        });
    }
    
    function downloadQRCode() {
        if (!currentCanvas) return;

        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = currentCanvas.toDataURL('image/png');
        link.click();
    }
});
