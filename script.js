// Hesap Makinasinda Girilen Rakamlarin Gorundugu Alani Seciyoruz
const display = document.querySelector('.calculator-input');

// Hesap Makinasinda Bulunan Butonlarin Hepsini Seciyoruz
const keys = document.querySelector('.calculator-keys');

// Hesap Makinasinda Girilen Rakamlarin Gorundugu Alana Deger Atamasi Yapiyoruz
let displayValue = '0';

// Girilen Ilk Degeri Tutuyoruz
let firstValue = null;

// Girilen Operator Bilgisini Tutuyoruz
let operator = null;

// Girilen Ikinci Degeri Tutuyoruz
let waitingForSecondValue = false;

updateDisplay();

// Fonksiyon Cagirildiginda Hesap Makinasi Acildigi Anda
// Ekranda DisplayValue Degiskenine Atanan Deger Gorunecek
function updateDisplay() {

    // Hesap Makinasinda Ilk Asamada Atanan Rakamin Gorunmesi Icin
    // Display Degiskeni Uzerinden input Alanina Girilen Degeri Gonderiyoruz
    display.value = displayValue;
}

keys.addEventListener('click', function(e) {

    // Hesap Makinasinda Herhangi Bir Butona Tiklanma Durumu Varsa Tiklanma Islemini Aliyoruz
    const element = e.target;

    // Class Attribute Icinde operator Yazan Elementlerin value Attribute larina Ulasiyoruz
    const value = element.value;

    // Hesap Makinasinda Herhangi Bir Butona Tiklanma Durumu Yoksa
    // Islem Yapmiyoruz
    if ((!element.matches('button'))){
        return;
    } 

    // Hesap Makinasinda Tiklanilan Buton
    switch(value) {

        // + - * / Butonlarindan Biri Ise
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':

            // Cagirilacak Fonksiyon
            handleOperator(value);
            
            break;
        case '.':

            // Hesap Makinasinda Tiklanilan Buton 
            // . Ise
            // Cagirilacak Fonksiyon
            inputDecimal();

            break;
        case 'clear':

            // Hesap Makinasinda Tiklanilan Buton 
            // AC Ise
            // Cagirilacak Fonksiyon
            clear();

            break;
        default:

            // Hesap Makinasinda Tiklanilan Buton 
            // Rakam Ise
            // Cagirilacak Fonksiyon
            inputNumber(element.value);        
    }

    // Hesap Makinasi Acildigi Anda Ve
    // AC Butonuna Tiklandiginda 
    // Ekranda 0 Yazilacak
    updateDisplay();
});

function handleOperator(nextOperator) {

    // Girilen Rakami Ondalikli Degeri Ceviriyoruz
    const value = parseFloat(displayValue);

    // Islem Icin Operator Girisi Yapimis Ise Ve
    // Sonraki Deger Girilmis Ise
    if(operator && waitingForSecondValue) {

        // Girilen Operator Bilgisini 
        // nextOperator Degiskenine Atama Yapiyoruz
        operator = nextOperator;
        return;
    }

    // Hesap Makinasina Deger Girisi Yoksa
    if (firstValue === null) {

        // Girilen Degeri value Degiskenine Atama Yapiyoruz
        firstValue = value;

        // Islem Yapilmasi Icin Operator Bilgisi Girilmis Ise
    } else if (operator) {

        // Yapilacak Isleme calculate Fonksiyonu Icinde
        // Ilk Parametre Olarak Girilen Ilk Degeri
        // Ikinci Parametre Olarak Ekranda Gorunen Degeri
        // Yapilacak Isleme Gore Girilen Operator Bilgisini Giriyoruz
        const result = calculate(firstValue, value, operator);

        // Islem Sonucunun Ondalikli Cikma Durumu Oldugundan 
        // parseFloat Fonksiyonu Ile Sonucu Ondalikli Duzeninde Yazdiyoruz
        // Ondalikli Sonucun Ondalik Hanesinde Yazacak Kisimi toFixed Fonksiyonu Ile 
        // Kac Hane Olacagini Belirtiyoruz
        displayValue = `${parseFloat(result.toFixed(7))}`;

        // Yapilan Isleme Devam Etmek Icin En Sonki Sonucu firstValue Degiskenine Atama Yapiyoruz
        firstValue = result;
    }

    // Gilecek Sonraki Degeri Bekliyoruz
    waitingForSecondValue = true;

    // Girilen Degeri Global Kisimda Yer Alan operator Degiskenine Atama Yapiyoruz
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

// Fonksiyondaki Ilk Parametre Islem Icin Girilen Ilk Degeri Aliyoruz
// Ikinci Parametre Islem Icin Girilen Ikinci Degeri Aliyoruz
// Ucuncu Parametre Yapilacak Islemin Girildigi Operator Bilgisini Aliyoruz
function calculate(first, second, operator) {

    // + Operatorune Tiklandiginda
    if(operator === '+') {

        // Girilen Degerleri Topluyoruz
        return first + second;

        // - Operatorune Tiklandiginda
    } else if (operator === '-') {

        // Girilen Degerleri Cikariyoruz
        return first - second;

        // * Operatorune Tiklandiginda
    } else if (operator === '*') {

        // Girilen Degerleri Carpiyoruz
        return first * second
        
        // / Operatorune Tiklandiginda
    } else if (operator === '/') {

        // Girilen Degerleri Boluyoruz
        return first / second;
    }

    // = Butonuna Tiklandiginda Islem Sonucunu Gormek Icin
    // Islemi Geri Donduruyoruz
    return second;
}

function inputNumber(num) {

    // Hesap Makinasina Sonraki Deger Girilmis Ise
    if(waitingForSecondValue) {

        // Girilen Degeri num Degiskenine Atama Yapiyoruz
        displayValue = num;

        // Sonraki Deger Girisi Durumunu Kapatiyoruz
        waitingForSecondValue = false;
    } else {

        // Hesap Makinasinin Ekraninda 0 Yaziyorsa 
        // Tiklanilan Rakamlari Sirayla Ekrana Yazidiyoruz
        displayValue = displayValue === '0'? num: displayValue + num;
    }

    // Hesap Makinasi Ilk Acildiginda Ekranda Yazacak Olan Degeri
    // Ilk Girilen Degeri
    // Girilen Operator Bilgisini
    // Girilen Sonraki Degeri 
    // Ekranda Gosteriyoruz
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {

    // Hesap Makinasinin Ekraninda . Operatoru Yoksa
    if (!displayValue.includes('.')) {

        // Ekleme Islemini Yapiyoruz
        displayValue += '.';
    }
}

// Fonksiyon Cagirildiginda Hesap Makinasinin Ekraninda
// 0 Yazilacak
function clear() {
    displayValue = '0';
}