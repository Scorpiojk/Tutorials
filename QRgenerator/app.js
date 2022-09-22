const form = document.getElementById('generate-form')
const qr = document.getElementById('qrcode')

const onGenerateSubmit = (e) => {
    e.preventDefault()

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if (url === '') {
        alert('Please enter a URL')
    } else {
        generateQRCode(url, size);

        setTimeout(() => {
            const saveUrl = qr.querySelector('img').src;
            createSaveBtn(saveUrl)
        }, 50)
    }
}

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    })
}

const clearUI = () => {
    qr.innerHTML = '';
    const saveBtn = document.getElementById('save-link')
    if(saveBtn)
    saveBtn.remove()
}

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'save-link';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('qrcode').appendChild(link);
};

form.addEventListener('submit', onGenerateSubmit)