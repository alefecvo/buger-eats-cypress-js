import signup from '../pages/SignupPage'

describe('', ()=>{

    //Execução feita antes de cada teste
    beforeEach(() => {
        //Acessando página e definindo resolução navegador
        signup.goSite()
    });

    //Test
    it('TEST 01 - Deve acessar a home BuggerEats', ()=>{
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
    })
})