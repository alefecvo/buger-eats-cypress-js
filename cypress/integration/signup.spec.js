import signup from '../pages/SignupPage'
import signupFactory from '../factory/SignupFactory'

describe('Cadastro', () => {

    //Execução feita antes de cada teste
    // beforeEach(function () {
    //     signup.goSite()
    //     cy.fixture('delivery').then((item) => {
    //         this.delivery = item
    //     })
    // });

     beforeEach(function () {
        signup.goSite()
    });

    //Test
    it.only('TEST 1 - User should be deliver - cpf correct', function () {
        
        var delivery = signupFactory.delivery()

        delivery.cpf = '12344567910'

        signup.fillForm(delivery)
        signup.validateForm(delivery)
        signup.submit()
        signup.modalContentShouldBe('Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.')
    })

    //Test
    it('TEST 2 - User should be deliver - cpf incorrect', function () {
        
        var delivery = signupFactory.delivery()

        delivery.cpf = '123445679'

        signup.fillForm(delivery)
        signup.validateForm(delivery)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    //Test
    it('TEST 3 - User should be deliver - email incorrect', function () {
        
        var delivery = signupFactory.delivery()

        delivery.email = 'user.data.br'

        signup.fillForm(delivery)
        signup.validateForm(delivery)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })
});