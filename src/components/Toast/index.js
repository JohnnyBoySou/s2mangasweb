import './toast.css'
function Toast(type, message) {
    const toastElement = document.createElement('div');
    toastElement.classList.add('toast');

    switch (type) {
        case 'alert':
            toastElement.style.backgroundColor = '#FFD972';
            toastElement.style.color = '#171717';
            break;
        case 'error':
            toastElement.style.backgroundColor = '#90323D';
            break;
        case 'success':
            toastElement.style.backgroundColor = '#6FEE6D';
            toastElement.style.color = '#171717';
            break;
        case 'progress':
            toastElement.style.backgroundColor = '#1A659E';
            break;
        default:
            toastElement.style.backgroundColor = '#C7EAE4';
            break;
    }


    toastElement.textContent = message;

    document.body.appendChild(toastElement);

    setTimeout(() => {
        toastElement.remove();
    }, 5000);
}

export default Toast;

