const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/productsController')
const productsService = require('../../../services/productsService')

const postSales = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 12
    },
    {
      productId: 2,
      quantity: 22
    }
  ]
}

describe('Ao chamar o controller Products', function () { 

  describe('Ao chamar o controller getAll', function () {
    describe('quando não existem produtos no banco de dados', function () {
      const response = {};
      const request = {};

      before(function () {

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getAll').resolves(null);
      });

      after(function () {
        productsService.getAll.restore();
      });

      it('é chamado o método "status" 404', async function () {
        await productsController.getAll(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('é chamado o método "json" com a mensagem "Product not found"', async function () {
        await productsController.getAll(request, response);

        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      });
    });

    describe('quando tem produtos no banco de dados', function () {
      const response = {};
      const request = {};
      before(function () {

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getAll').resolves(true);
      });

      after(function () {
        productsService.getAll.restore();
      });

      it('é chamado o método "status" 200', async function () {
        await productsController.getAll(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('é chamado o método "json" com a mensagem "Product not found"', async function () {
        await productsController.getAll(request, response);

        expect(response).to.be.an('object');
      });
    });
  })

  describe('Ao chamar o controller de getById', function () {
    describe('quando não existem produtos no banco de dados', function () { 
      const response = {};
      const request = {};
      
      before(function () {
        request.params = {
          id: 1,
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getById').resolves(null);
      });

      after(function () {
        productsService.getById.restore();
      });

      it('é chamado o método "status" 404', async function () {
        await productsController.getById(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('é chamado o método "json" com a mensagem "Product not found"', async function () {
        await productsController.getById(request, response);

        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      });
    });

    describe('quando tem produtos no banco de dados', function () {
      const response = {};
      const request = {};
      before(function () {
        request.params = {
          id: 1,
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getById').resolves(true);
      });

      after(function () {
        productsService.getById.restore();
      });

      it('é chamado o método "status" 200', async function () {
        await productsController.getById(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('é chamado o método "json" com a mensagem "Product not found"', async function () {
        await productsController.getById(request, response);

        expect(response).to.be.an('object');
      });
    });
  })

})