//colors picker
const mainColorPicker = document.querySelector('#color');
const backgroundColorPicker = document.querySelector('#bg-color');

const mainColorValue = document.querySelector('#color-value');
const backgroundColorValue = document.querySelector('#bg-color-value');

const updateColor = e => {
    const value = e.target.value;
    mainColorValue.innerText = value;
};

const updateBackgroundColor = e => {
    const value = e.target.value;
    backgroundColorValue.innerText = value;
};

const addColorPickerEventListeners = () => {
    mainColorPicker.addEventListener('change', updateColor);
    backgroundColorPicker.addEventListener('change', updateBackgroundColor);
};
addColorPickerEventListeners();

//sliders
const sizeSlider = document.querySelector('#size');
const marginSlider = document.querySelector('#margin');

const sizeValue = document.querySelector('#size-value');
const marginValue = document.querySelector('#margin-value');

const updateSize = e => {
    const value = e.target.value;
    sizeValue.innerText = `${value} x ${value}`;
};

const updateMargin = e => {
    const value = e.target.value;
    marginValue.innerText = `${value} px`;
};

const addSliderEventListeners = () => {
    sizeSlider.addEventListener('change', updateSize);
    marginSlider.addEventListener('change', updateMargin);
};
addSliderEventListeners();

//submit button
const dataInput = document.querySelector('#data');
// FORMAT
const imageFormat = document.querySelector('input[name="format"]:checked');

const submitButton = document.querySelector('#cta');

const showInputError = () => {
    dataInput.classList.add('error');
};
const addDataInputEventListener = () => {
    dataInput.addEventListener('change', e => {
        if (e.target.value !== '') {
            dataInput.classList.remove('error');
            submitButton.removeAttribute('disabled');
        } else {
            dataInput.classList.add('error');
            submitButton.setAttribute('disabled', true);
        }
    });
};
addDataInputEventListener();

const prepareParameters = params => {
    const prepared = {
        data: params.data,
        size: `${params.size}x${params.size}`,
        color: params.color.replace('#', ''), // to remove # from color
        bgcolor: params.bgColor.replace('#', ''), // to remove # from color
        format: params.format,
    };
    return prepared;
};

const settingsContainer = document.querySelector('#qr-code-settings');
const resultContainer = document.querySelector('#qr-code-result');
const qrCodeImage = document.querySelector('#qr-code-image');

const displayQrCode = imgUrl => {
    settingsContainer.classList.add('flipped');
    resultContainer.classList.add('flipped');
    qrCodeImage.setAttribute('src', imgUrl);
};

const getQrCode = parameters => {
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
    const urlParams = new URLSearchParams(parameters).toString();
    
    const fullUrl = `${baseUrl}?${urlParams}`;

    fetch(fullUrl).then(response => {
        if (response.status == 200) {
            displayQrCode(fullUrl);
        }
    });
};


const onSubmit = () => {
    console.log('request_submitted');

    const data = dataInput.value;

    if (!data.length) {
        return showInputError();
    }

    const color = mainColorPicker.value;
    const bgColor = backgroundColorPicker.value;
    const format = imageFormat.value;
    const size = sizeSlider.value;
    const parameters = prepareParameters({ data, color, bgColor, format, size });

    getQrCode(parameters);
};

const addSubmitEventListener = () => {
   submitButton.addEventListener('click', onSubmit);
};
addSubmitEventListener();

const editButton = document.querySelector('#edit')

const onEdit = () => {
    settingsContainer.classList.remove('flipped');
    resultContainer.classList.remove('flipped');
};

const addEditEventListener = () => {
    editButton.addEventListener('click', onEdit);
};

addEditEventListener();
