describe('Cadastro', () => {
    //Execução feita antes de cada teste
    beforeEach(() => {
        //Acessando página e definindo resolução navegador
        cy.viewport(1440,900)
        cy.visit('https://buger-eats.vercel.app/');
        cy.get('a[href="/deliver"]').click();
    });

    //Test
    it('TEST 1 - FLUXO PRINCIPAL - Cadastrar novo entregador com cpf correto', ()=>{
        //Acessando cadastro de entregador
        cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas')
    
        //Criando massa de dado para entregador preencher formulário
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
        //Preenchimento dados do entregador
        cy.get('#page-deliver input[name=name]').type(delivery.name);
        cy.get('#page-deliver input[name=cpf]').type(delivery.cpf);
        cy.get('#page-deliver input[name=email]').type(delivery.email);
        cy.get('#page-deliver input[name=whatsapp]').type(delivery.whatsapp);

        //Preenchimento dados de endereço
        cy.get('#page-deliver input[name=postalcode]').type(delivery.address.postalcode);
        cy.get('#page-deliver input[value="Buscar CEP"]').click();
        cy.get('#page-deliver input[name="address-number"]').type(delivery.address.number);
        cy.get('#page-deliver input[name="address-details"]').type(delivery.address.details);

        //Validando preenchimento campos de endereço
        cy.get('input[name="address"]').should('have.value',delivery.address.street);
        cy.get('input[name="district"]').should('have.value',delivery.address.district);
        cy.get('input[name="city-uf"]').should('have.value',delivery.address.city_state);

        //Preenchendo dados de método de entrega por Moto
        cy.contains('.delivery-method li', delivery.delivery_method).click();
        
        //Fazendo upload da CNH
        cy.get('input[accept^="image"]').attachFile('/images/' + delivery.cnh);

        //Submetendo dados do cadastro
        cy.get('button[type="submit"]').click();

        //Validando cadastro do entregador
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        
        cy.get('.swal2-container .swal2-html-container').should('have.text',expectedMessage);
    })

    //Test
    it('TEST 2 - FLUXO ALTERNATIVO - Cadastrar novo entregador com cpf incorreto', ()=>{
        //Acessando cadastro de entregador
        cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas')
    
        //Criando massa de dado para entregador preencher formulário
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
        //Preenchimento dados do entregador
        cy.get('#page-deliver input[name=name]').type(delivery.name);
        cy.get('#page-deliver input[name=cpf]').type(delivery.cpf);
        cy.get('#page-deliver input[name=email]').type(delivery.email);
        cy.get('#page-deliver input[name=whatsapp]').type(delivery.whatsapp);

        //Preenchimento dados de endereço
        cy.get('#page-deliver input[name=postalcode]').type(delivery.address.postalcode);
        cy.get('#page-deliver input[value="Buscar CEP"]').click();
        cy.get('#page-deliver input[name="address-number"]').type(delivery.address.number);
        cy.get('#page-deliver input[name="address-details"]').type(delivery.address.details);

        //Validando preenchimento campos de endereço
        cy.get('input[name="address"]').should('have.value',delivery.address.street);
        cy.get('input[name="district"]').should('have.value',delivery.address.district);
        cy.get('input[name="city-uf"]').should('have.value',delivery.address.city_state);

        //Preenchendo dados de método de entrega por Moto
        cy.contains('.delivery-method li', delivery.delivery_method).click();
        
        //Fazendo upload da CNH
        cy.get('input[accept^="image"]').attachFile('/images/' + delivery.cnh);

        //Submetendo dados do cadastro
        cy.get('button[type="submit"]').click();

        //Validando cadastro do entregador
        const expectedMessage = 'Oops! CPF inválido'
        
        cy.get('.alert-error').should('have.text',expectedMessage);
    })
});