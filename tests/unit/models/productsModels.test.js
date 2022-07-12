const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');

const productsModel = require('../../../models/productsModel')

const allProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
]

const id = 1
const name = "The Office"

describe('Ao chamar a camada Models', function () {

  describe('Insere um novo produto no BD "create"', function () { 
    const payLoadProduct = {
      name: "batata"
    }
    before(async function () {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async function () {
      connection.execute.restore();
    });

    describe('quando é inserido com sucesso', function () {
      it('retorna um objeto', async function () {
        const response = await productsModel.create(payLoadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui o "id" do novo filme inserido', async function () {
        const response = await productsModel.create(payLoadProduct);

        expect(response).to.have.a.property('id');
      });
    });

  })

  describe('Deleta um produto no BD usando o id "delete"', function () {
    before(async function () {
      const execute = [[]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async function () {
      connection.execute.restore();
    });

    describe('quando é deletado com sucesso', async function () {
      const response = await productsModel.deleteProduct(id)
      expect(response).to.have.property('REMOVED')
    })

   })

  describe('Atualiza um produto no BD usando o id "updateById"', function () {
    before(async function () {
      const execute = [[]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async function () {
      connection.execute.restore();
    });

    describe('quando é deletado com sucesso', async function () {
      const response = await productsModel.updateById(id, name)
      expect(response).to.have.property('UPDATE')
    })

  })

  
  describe('Retorna todos os produtos "getall"', function () {
    
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

  describe('Busca apenas um produto no BD pelo ID "getById', function () {

    describe('Quando não existe um  produto com o ID informado', function () {
      before(async function () {
        const execute = [[]];
      
        sinon.stub(connection, 'execute').resolves([execute])
      })
    
      after(async function () {
        // connection.execute.restore()
        productsModel.getById.restore();
      })

      it('retorna vazio', async function () {
        const wrongId = 999999

        const response = await productsModel.getById(wrongId);

        expect(Object.keys(response)).to.have.lengthOf(0)
      })

      describe('Quando existe um produto com o ID informado', function () {
        before(async function () {
          const execute = {
            "id": 1,
            "name": "Martelo de Thor"
          };

          sinon.stub(productsModel, 'getById').resolves(execute);
        });

        after(async function () {
          connection.execute.restore();
        });
        
        describe('Busca um produto com sucesso passando o "ID"', function () {
          it('retorna um objeto', async function () {
            const response = await productsModel.getById(id);

            expect(response).to.be.an('object')
          })

          it('o objeto não está vazio', async function () {
            const response = await productsModel.getById(id);

            expect(Object.keys(response)).to.have.lengthOf(2)
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
