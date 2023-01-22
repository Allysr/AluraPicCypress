describe("Buscar fotos e dados", () => {
  it("Buscar fotos do Flavio", () => {
    cy.request({
      method: "GET",
      url: "https://apialurapic.herokuapp.com/flavio/photos",
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).is.not.empty;
      expect(res.body[0]).to.have.property("description");
      expect(res.body[0].description).to.be.equal("Farol iluminado");
    });
  });

  it("Fazer login do Flavio", () => {
    cy.request({
      method: "POST",
      url: "https://apialurapic.herokuapp.com/user/login",
      body: Cypress.env(),
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).is.not.empty;
      expect(res.body).to.have.property("id");
      expect(res.body.id).to.be.equal(1);
    });
  });

  /*Flaky test
  const tempoEsperado = Math.random() * 3000;
  it("Buscar fotos do Flavio", () => {
    cy.request({
      method: "GET",
      url: "https://apialurapic.herokuapp.com/flavio/photos",
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).is.not.empty;
      expect(res.duration).to.be.lte(tempoEsperado);
    });
  });
  */
});
