
import Validator from './modules/validator'

 const validForm3 = new Validator({
    selector: '#form3',
    pattern: {
        name: /^[а-яА-Я\s]+$/,
        phone: /^\+?(\d{11})$/

    },
    method: {
        'form3-phone': [
            ['notEmpty'],
            ['pattern', 'phone'],
        ],
        'form3-email': [
            ['notEmpty'],
            ['pattern', 'email'],
        ],
        'form3-name': [
            ['notEmpty'],
            ['pattern', 'name'],
        ],
        'form3-message': [
            ['notEmpty'],
            ['pattern', 'name'],
        ],
    }
})
validForm3.init();