window.addEventListener('DOMContentLoaded', function (event){


    //Галерея--------->

    $(document).ready(function(){
        $('.gallery-slider').slick({
            slidesToShow: 3,            // Показывать 3 изображения на экране
            slidesToScroll: 1,          // Прокручивать по одному изображению
            arrows: true,               // Показывать стрелки
            dots: true,                 // Включить пагинацию (пейджер)
            responsive: [
                {
                    breakpoint: 768,    // На устройствах до 768px
                    settings: {
                        slidesToShow: 1 // Показывать одно изображение
                    }
                }
            ]
        });
    });


    const quantityInput = document.getElementById('quantity');
    const serviceRadios = document.querySelectorAll('input[name="type"]');
    const optionSelect = document.getElementById('option');
    const optionSelectAll = document.getElementById('memory');
    const propertyCheckboxAll = document.getElementById('checkboxes');
    const propertyCheckbox = document.querySelectorAll('input[name="check"]');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    optionSelectAll.style.display = 'none';
    propertyCheckboxAll.style.display = 'none';
    function calculateCost() {
        const quantity = parseInt(quantityInput.value);
        let price = 0;
        let selectedService = null;
        let selectedCheck = null;

        for (const radio of serviceRadios) {
            if (radio.checked) {
                selectedService = radio;
                price = parseInt(radio.value);
                break;
            }
        }

        if (selectedService) {
            if (selectedService.id === 'sixth' || selectedService.id === 'fifth') {
                optionSelectAll.style.display = 'block';
                propertyCheckboxAll.style.display = 'block';
                price += parseInt(optionSelect.value);
                for (const checkbox of propertyCheckbox) {
                    if (checkbox.checked) {
                        selectedCheck = checkbox;
                        price += parseInt(selectedCheck.value);
                    }
                }
            }
            else if (selectedService.id === 'third' || selectedService.id === 'fourth') {
                if(selectedService.id === 'third'){
                    propertyCheckboxAll.style.display = 'none';
                    optionSelectAll.style.display = 'block';
                    price += parseInt(optionSelect.value);
                }
                if(selectedService.id === 'fourth'){
                    propertyCheckboxAll.style.display = 'block';
                    optionSelectAll.style.display = 'none';
                    for (const checkbox of propertyCheckbox) {
                        if (checkbox.checked) {
                            selectedCheck = checkbox;
                            price += parseInt(selectedCheck.value);
                        }
                    }
                } 
            }
            else {
                optionSelectAll.style.display = 'none';
                propertyCheckboxAll.style.display = 'none';
            }
        }
        if (quantity <= 0 || isNaN(quantity)) {
            resultDiv.textContent = 'Некорректное количество товара!';
            return;
        }
        const totalCost = quantity * price;
        resultDiv.textContent = `Стоимость заказа: ${totalCost} руб.`;
    }
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', calculateCost);
    });
    propertyCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', calculateCost);
    });
    optionSelect.addEventListener('change', calculateCost);
    quantityInput.addEventListener('change', calculateCost);
    calculateButton.addEventListener('click', calculateCost);


    

});