from flask import Flask, render_template, request, jsonify, send_file
import qrcode
from PIL import Image
import os
from datetime import datetime, timedelta
import io

app = Flask(__name__)

# Ensure the uploads directory exists
UPLOAD_FOLDER = 'static/qr_codes'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_qr():
    data = request.json
    url = data.get('url')
    color = data.get('color', '#000000')
    style = data.get('style', 'standard')
    expiry = data.get('expiry', None)  # in minutes, None for indefinite
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    # Create QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Create QR code image
    img = qr.make_image(fill_color=color, back_color="white")
    
    # Apply style if specified
    if style == 'rounded':
        # Create a rounded corners effect
        mask = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.rounded_rectangle([(0, 0), img.size], radius=20, fill=255)
        img.putalpha(mask)
    
    # Save QR code
    filename = f"qr_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    img.save(filepath)

    # If expiry is set, schedule deletion
    if expiry:
        expiry_time = datetime.now() + timedelta(minutes=expiry)
        # In a production environment, you would use a task queue like Celery
        # For now, we'll just return the expiry time
        return jsonify({
            'qr_code': f'/static/qr_codes/{filename}',
            'expires_at': expiry_time.isoformat()
        })
    
    return jsonify({
        'qr_code': f'/static/qr_codes/{filename}'
    })

if __name__ == '__main__':
    app.run(debug=True) 