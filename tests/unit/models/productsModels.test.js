const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');

const productsModel = require('../../../models/productsModel')

const allProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
]

describe('Ao chamar a camada Models', function () {

  describe('Retorna todos os produtos', function () {
    
    describe('Quando não tem a lista de produtos', function () {
      before(async function () {
        const execute = [[]];
      
        sinon.stub(connection, 'execute').resolves(execute)
      })
    
      after(async function () {
        connection.execute.restore()
      })
      it('retorna null', async function () {
        const response = await productsModel.getAll();

        expect(response).to.be.equal(null)
      })
    })

    describe('Quanto tem os produtos na lista', function () {
     
      before(async function () {
        sinon.stub(connection, 'execute').resolves([allProducts])
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
    
    const id = 1

    describe('Quando não existe um  produto com o ID informado', function () {
      before(async function () {
        const execute = [[]];
      
        sinon.stub(connection, 'execute').resolves([execute])
      })
    
      after(async function () {
        connection.execute.restore()
      })

      it('retorna null', async function () {
        const response = await productsModel.getById(id);

        expect(response).to.deep.equal({ id: undefined, name: undefined })
      })

      describe('Quando existe um produto com o ID informado', function () {

        describe('Busca um produto com sucesso passando o "ID"', function () {
          it('retorna um objeto', async function () {
            const response = await productsModel.getById(id);

            expect(response).to.be.an('object')
          })

          it('o objeto não está vazio', async function () {
            const response = await productsModel.getById(id);

            expect(response).to.be.not.empty
          })

          it('o objeto tem as propriedades: "id", "name"', async function () {
            const response = await productsModel.getById(id);

            expect(response).to.have.all.keys('id', 'name')
          })
        })

      })
    })

  });
});
