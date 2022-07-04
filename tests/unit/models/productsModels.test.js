const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');

const productsModel = require('../../../models/productsModel')

const allProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
]


describe('Retorna todos os produtos', function () {
  before(async function () {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute)
  })

  after(async function () {
    productsModel.getAll.restore()
  })

  describe('Quando não tem a lista de produtos', function () {
    it('retorna null', async function () {
      const response = await productsModel.getAll();

      expect(response).to.be.equal(null)
    })
  })

  describe('Quanto tem os produtos na list', function () {
    before(async function () {
      sinon.stub(productsModel, 'getAll').resolves(allProducts)
    })
    after(async function () {
      connection.execute.restore()
    })
    describe('Busca um produto com sucesso', function () {
      it('retorna um array', async function () {
        const response = await productsModel.getAll();

        expect(response).to.be.an('array')
      })

      it('o array não está vazio', async function () {
        const response = await productsModel.getAll();


        expect(response).to.be.an('array').that.not.empty
      })

      it('o array tem as propriedades: "id", "name"', async function () {
        const response = await productsModel.getAll();

        expect(response).to.deep.equals(allProducts)
      })
    })

  })
})

describe('Busca apenas um produto no BD pelo ID', function () {
  before(async function () {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute)
  })

  after(async function () {
    productsModel.getById.restore()
  })

  describe('Quando não tem um produto com o ID informado', function () {
    it('retorna null', async function () {
      const response = await productsModel.getById();

      expect(response).to.be.equal(null)
    })

    describe('Quando existe um produto com o ID informado', function () {
      before(async function () {
        const execute = {
          id: 1,
          name: "Martelo de Thor"
        }

        sinon.stub(productsModel, 'getById').resolves(execute)
      })

      after(async function () {
        connection.execute.restore()
      })

      describe('Busca um produto com sucesso', function () {
        it('retorna um objeto', async function () {
          const response = await productsModel.getById(1);

          expect(response).to.be.an('object')
        })

        it('o objeto não está vazio', async function () {
          const response = await productsModel.getById(1);

          expect(response).to.be.not.empty
        })

        it('o objeto tem as propriedades: "id", "name"', async function () {
          const response = await productsModel.getById(1);

          expect(response).to.have.all.keys('id', 'name')
        })
      })

    })
  })

});

