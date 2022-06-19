describe('Cadastro', () => {
    //Execução feita antes de cada teste
    beforeEach(() => {
        //Acessando página e definindo resolução navegador
        cy.viewport(1440,900)
        cy.visit('https://buger-eats.vercel.app/');
        cy.get('a[href="/deliver"]').click();
    });

    //Test
    it('TEST 1 - Usuário deve se tornar um entregador', ()=>{
        //Acessando cadastro de entregador
        cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas')
    
        //Criando massa de dado para entregador preencher formulário
        var dadosEntregador ={
            nome: 'Júlia Marrone',
            cpf: '12345678910',
            email: 'juliamarrone@bol.com',
            whatsapp: '11912121212',
            endereco:{
                cep: '35794106',
                rua: 'Rua Joinvile',
                numero: '130',
                complemento: 'casa',
                bairro: 'Jardim Paraíso',
                cidade_uf: 'Curvelo/MG'
            }
    }
        //Preenchimento dados do entregador
        cy.get('#page-deliver input[name=name]').type(dadosEntregador.nome);
        cy.get('#page-deliver input[name=cpf]').type(dadosEntregador.cpf);
        cy.get('#page-deliver input[name=email]').type(dadosEntregador.email);
        cy.get('#page-deliver input[name=whatsapp]').type(dadosEntregador.whatsapp);

        //Preenchimento dados de endereço
        cy.get('#page-deliver input[name=postalcode]').type(dadosEntregador.endereco.cep);
        cy.get('#page-deliver input[value="Buscar CEP"]').click();
        cy.get('#page-deliver input[name="address-number"]').type(dadosEntregador.endereco.numero);
        cy.get('#page-deliver input[name="address-details"]').type(dadosEntregador.endereco.complemento);

        //Validando preenchimento campos de endereço
        cy.get('input[name="address"]').should('have.value',dadosEntregador.endereco.rua);
        cy.get('input[name="district"]').should('have.value',dadosEntregador.endereco.bairro);
        cy.get('input[name="city-uf"]').should('have.value',dadosEntregador.endereco.cidade_uf);

    })
});