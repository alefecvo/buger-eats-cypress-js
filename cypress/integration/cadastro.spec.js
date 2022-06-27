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
    it('TEST 1 - FLUXO PRINCIPAL - Cadastrar novo entregador com cpf correto', function () {

        signup.goSite()
        signup.fillForm(this.delivery.cpf_valido)
        signup.validateForm(this.delivery.cpf_valido)
        signup.submit()
        signup.modalContentShouldBe('Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.')

    })

    //Test
    it('TEST 2 - FLUXO ALTERNATIVO - Cadastrar novo entregador com cpf incorreto', function () {



        signup.goSite()
        signup.fillForm(this.delivery.cpf_invalido)
        signup.validateForm(this.delivery.cpf_invalido)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')

    })
});