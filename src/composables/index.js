export const getImageUrl = (imageName) => {
    const urlInstance = new URL(`/src/assets/${imageName}`, import.meta.url);
    if (urlInstance.href.includes('undefined')) {
        console.log(imageName, 'imageName');
    }
    return urlInstance.href;
};


export const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D+/g, '');
    return `${cleaned.slice(0, 3)}-${cleaned.slice(
        3,
        6
    )}-${cleaned.slice(6, 10)}`;
}

export const formatPhoneNumberToDigit = (input) => {
    let phoneInput = input.replace(/\D+/g, "");
    if (phoneInput.length >= 4 && phoneInput.length <= 6) {
        return phoneInput.slice(0, 3) + phoneInput.slice(3);
    } else if (phoneInput.length >= 7) {
        return (
            phoneInput.slice(0, 3) + phoneInput.slice(3, 6) + phoneInput.slice(6)
        );
    } else {
        return phoneInput;
    }
}