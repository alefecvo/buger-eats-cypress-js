import signup from '../pages/SignupPage'

describe('Cadastro', () => {

    //Execução feita antes de cada teste
    beforeEach(function () {
        signup.goSite()
        cy.fixture('delivery').then((item) => {
            this.delivery = item
        })
    });

    //Test
    it('TEST 1 - User should be deliver - cpf correct', function () {
        signup.fillForm(this.delivery.cpf_valido)
        signup.validateForm(this.delivery.cpf_valido)
        signup.submit()
        signup.modalContentShouldBe('Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.')
    })

    //Test
    it('TEST 2 - User should be deliver - cpf incorrect', function () {
        signup.fillForm(this.delivery.cpf_invalido)
        signup.validateForm(this.delivery.cpf_invalido)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    //Test
    it.only('TEST 3 - User should be deliver - email incorrect', function () {
        signup.fillForm(this.delivery.email_invalido)
        signup.validateForm(this.delivery.email_invalido)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })
});