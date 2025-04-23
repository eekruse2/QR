document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url-input');
    const textInput = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrCodeContainer = document.getElementById('qr-code');
    
    let currentQRCode = null;
    
    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);
    
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
        
        // Generate new QR code
        QRCode.toCanvas(qrCodeContainer, inputValue, {
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
            
            // Enable download button
            downloadBtn.disabled = false;
            currentQRCode = inputValue;
        });
    }
    
    function downloadQRCode() {
        if (!currentQRCode) return;
        
        const canvas = qrCodeContainer.querySelector('canvas');
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}); 