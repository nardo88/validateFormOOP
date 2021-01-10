class Validator{
    // конструктор принимает три аргумента
    // 1 - это селектор формы
    // 2 - pattern - это объект в качестве ключей которого будут регулярные выражения
    // 3 - method - это объект с полями формы и как мы будем их проверять
    constructor({selector, pattern = {}, method}){
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        // получаем элементы формы т.е. все инпуты и textarea? все кроме кнопок
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
        });
        // в Set коллекции будем хранить ошибки если Set пустой то форму можно отправлять по AJAX
        this.error = new Set();
    }
    // bybwbfkbpfwbz
    init() {
        // добавление стилей для высплывашек о том что поле не валидно
        this.applyStyle();
        // 
        this.setPattern();
        this.elementsForm.forEach(item => item.addEventListener('change', this.checkIt.bind(this)))
        this.form.addEventListener('submit', e => {
           
            this.elementsForm.forEach(item => { 
                this.checkIt({target: item})

            });

            if (this.error.size){
                e.preventDefault()
            }
            return 'error'
        })
    }
    // возвращает Set коллекцию, если Set пустой то форму можно отправлять по AJAX
    sayError() {
        return this.error
    }


    isValid(elem){
        const validatorMethod = {
            // проверка не пустое поле
            notEmpty(elem){
                if (elem.value.trim() === ''){
                    return false;
                }
                return true
            },
            // проверяем элемент на регулярке
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };

        if (this.method){
            const method = this.method[elem.id];
            if (method){
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей!');
        }
        
        return true
    }
    // метод проверки поля
    checkIt(e) {
        
        const target = e.target;
        // метод isValid возвращает true если поле валидно и false eckb валидация не была пройдена
        // в зависимости от того что вернет isValid мы либо окрашиваем поле в красный цвет и добавляем в Set коллекцию наш input
        // либо наоборот удаляем из коллекции input b убираем класс сигнализирующий об ошибке
        if (this.isValid(target)){
            this.showSuccess(target)
            this.error.delete(target)

        } else {
            this.showError(target)
            this.error.add(target)
        }
    }
    // отображение ошибки
    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            return
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
        
    }
    // отображение если поле валидно
    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if( elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            elem.nextElementSibling.remove();
        }
    }
    // добавление стилей высплывашек
    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
            input.success{
                border: 2px solid green;
            }
            input.error{
                border: 2px solid red;
                box-shadow: 0 0 10px 10px red;
                
            }
            .validator-error{
                font-size: 12px;
                color: red;
                font-family: sans-serif;
                position: absolute;
                bottom: -5px;
                padding: 5px 10px;
                background: #fff;
                border-radius: 5px;
                border: 2px solid black;
                z-index: 100;
                
            }
            .validator-error:after{
                content: '';
                position: absolute;
                width: 10px;
                height: 10px;
                background: #fff;
                top: -7px;
                transform: rotate(-135deg);
                left: 20px;
                border-right: 2px solid black;
                border-bottom: 2px solid black;
            }
        `
        document.head.appendChild(style)
    }
    // патерны по умолчанию
    setPattern() {
        if (!this.pattern.phone){
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }

        if (!this.pattern.email){
            this.pattern.email = /\w+@\w+\.\w{2,3}/;
        }

    }
}


export default Validator