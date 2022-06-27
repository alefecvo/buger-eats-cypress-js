class signupPage {
    goSite() {
        //Acessando página e definindo resolução navegador
        cy.visit('/');
        cy.get('a[href="/deliver"]').click();

        //Acessando cadastro de entregador
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

    }

    fillForm(delivery) {
        //Preenchimento dados do entregador
        cy.get('#page-deliver input[name=fullName]').type(delivery.name);
        cy.get('#page-deliver input[name=cpf]').type(delivery.cpf);
        cy.get('#page-deliver input[name=email]').type(delivery.email);
        cy.get('#page-deliver input[name=whatsapp]').type(delivery.whatsapp);

        //Preenchimento dados de endereço
        cy.get('#page-deliver input[name=postalcode]').type(delivery.address.postalcode);
        cy.get('#page-deliver input[value="Buscar CEP"]').click();
        cy.get('#page-deliver input[name="address-number"]').type(delivery.address.number);
        cy.get('#page-deliver input[name="address-details"]').type(delivery.address.details);

        //Preenchendo dados de método de entrega por Moto
        cy.contains('.delivery-method li', delivery.delivery_method).click();

        //Fazendo upload da CNH
        cy.get('input[accept^="image"]').attachFile('/images/' + delivery.cnh);
    }

    validateForm(delivery) {
        //Validando preenchimento campos de endereço
        cy.get('input[name="address"]').should('have.value', delivery.address.street);
        cy.get('input[name="district"]').should('have.value', delivery.address.district);
        cy.get('input[name="city-uf"]').should('have.value', delivery.address.city_state);
    }

    submit() {
        //Submetendo dados do cadastro
        cy.get('button[type="submit"]').click();
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage);

    }

    alertMessageShouldBe(expectedMessage) {
        cy.get('.alert-error').should('have.text', expectedMessage);
    }
}
export default new signupPage;