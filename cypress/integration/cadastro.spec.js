describe('Cadastro', () => {
    //Execução feita antes de cada teste
    beforeEach(() => {
        //Acessando página e definindo resolução navegador
        cy.viewport(1440,900)
        cy.visit('https://buger-eats.vercel.app/');
        cy.get('a[href="/deliver"]').click();
    });

    //Test
    it('TEST 1 - FLUXO PRINCIPAL - Cadastrar novo entregador', ()=>{
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
            },
            metodo_entrega: 'Moto',
            cnh: 'cnh-digital.jpg'
            
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

        //Preenchendo dados de método de entrega por Moto
        cy.contains('.delivery-method li', dadosEntregador.metodo_entrega).click();
        
        //Fazendo upload da CNH
        cy.get('input[accept^="image"]').attachFile('/images/' + dadosEntregador.cnh);

        //Submetendo dados do cadastro
        cy.get('button[type="submit"]').click();

        //Validando cadastro do entregador
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        
        cy.get('.swal2-container .swal2-html-container').should('have.text',expectedMessage);
    })
});