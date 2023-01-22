describe("Alura Fotos ", () => {
  beforeEach(() => {
    cy.visit("https://alura-fotos.herokuapp.com/#/home");
  });

  it("Ao clicar no botão de registrar sem dados, deve ocorrer um erro.", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Email is required!").should("be.visible");
    cy.contains("ap-vmessage", "Full name is required!").should("be.visible");
    cy.contains("ap-vmessage", "User name is required!").should("be.visible");
    cy.contains("ap-vmessage", "Password is required!").should("be.visible");
  });

  it("Verifica se o email está invalido.", () => {
    cy.contains("a", "Register now").click();
    cy.get('input[formcontrolname="email"]').type("alicia");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Invalid e-mail").should("be.visible");
  });

  it("Verifica se o email está invalido.", () => {
    cy.contains("a", "Register now").click();
    cy.get('input[formcontrolname="password"]').type("123");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 8").should("be.visible");
  });

  it("Fazer login de usuario válido", () => {
    cy.login("flavio", 123);
    cy.contains("a", "flavio");
  });

  it("Fazer login de usuario Inválido", () => {
    cy.login("flavio", 123);
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Invalid user name or password");
    });
  });

  const usuarios = require("../../fixtures/usuarios.json");
  usuarios.forEach((usuario) => {
    it.only(`Registrar novo usuário ${usuario.userName}`, () => {
      cy.contains("a", "Register now").click();
      cy.contains("button", "Register").click();
      cy.get('input[formcontrolname="email"]').type(usuario.email);
      cy.get('input[formcontrolname="fullName"]').type(usuario.fullName);
      cy.get('input[formcontrolname="userName"]').type(usuario.userName);
      cy.get('input[formcontrolname="password"]').type(usuario.password);
      cy.contains("button", "Register").click();
    });
  });
});
