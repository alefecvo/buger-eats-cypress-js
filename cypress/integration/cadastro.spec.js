import SignupPage from '../pages/SignupPage'

describe('Cadastro', () => {

    var signup = new SignupPage()   

    //Execução feita antes de cada teste
    beforeEach(() => {
        signup.goSite()
    });

    //Test
    it('TEST 1 - FLUXO PRINCIPAL - Cadastrar novo entregador com cpf correto', ()=>{
   
        var delivery ={
            name: 'Júlia Marrone',
            cpf: '12345678910',
            email: 'juliamarrone@bol.com',
            whatsapp: '11912121212',
            address:{
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

        signup.goSite()
        signup.fillForm(delivery)
        signup.validateForm(delivery)
        signup.submit()
        signup.modalContentShouldBe('Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.')
       
    })

    //Test
    it.only('TEST 2 - FLUXO ALTERNATIVO - Cadastrar novo entregador com cpf incorreto', ()=>{
      
        var delivery ={
            name: 'Júlia Marrone',
            cpf: '123456789',
            email: 'juliamarrone@bol.com',
            whatsapp: '11912121212',
            address:{
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
     
        signup.goSite()
        signup.fillForm(delivery)
        signup.validateForm(delivery)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
       
    })
});