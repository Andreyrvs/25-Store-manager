
const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/salesController')
const salesService = require('../../../services/salesService')

describe('Ao chamar o controller Sales', function () {

  describe('Ao chamar o controller de getall', function () {
  describe('quando não existem produtos no banco de dados', function () {
    const response = {};
    const request = {};

    before(function () {

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(null);
    });

    after(function () {
      salesService.getAll.restore();
    });

    it('é chamado o método "status" 404', async function () {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem "Sale not found"', async function () {
      await salesController.getAll(request, response);

      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });
  });

  describe('quando tem produtos no banco de dados', function () {
    const response = {};
    const request = {};
    before(function () {

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(true);
    });

    after(function () {
      salesService.getAll.restore();
    });

    it('é chamado o método "status" 200', async function () {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json"', async function () {
      await salesController.getAll(request, response);

      expect(response).to.be.an('object')
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
  
        sinon.stub(salesService, 'getById').resolves(null);
      });
  
      after(function () {
        salesService.getById.restore();
      });
  
      it('é chamado o método "status" 404', async function () {
        await salesController.getById(request, response);
  
        expect(response.status.calledWith(404)).to.be.equal(true);
      });
  
      it('é chamado o método "json" com a mensagem "Sale not found"', async function () {
        await salesController.getById(request, response);
  
        expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
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
  
        sinon.stub(salesService, 'getById').resolves(true);
      });
  
      after(function () {
        salesService.getById.restore();
      });
  
      it('é chamado o método "status" 200', async function () {
        await salesController.getById(request, response);
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json"', async function () {
        await salesController.getById(request, response);
  
        expect(response).to.be.an('object')
      });
    });
  })
})


