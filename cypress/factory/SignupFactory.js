export default {
    delivery: function () {
        var data = {
            name: 'Júlia Marrone',
            cpf: '12345678910',
            email: 'juliamarrone@bol.com',
            whatsapp: '11912121212',
            address: {
                postalcode: '35794106',
                street: 'Rua Joinvile',
                number: '130',
                details: 'casa',
                district: 'Jardim Paraíso',
                city_state: 'Curvelo/MG'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }
        return data
    }
}