const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');

const salesService = require('../../../services/salesService')

const allSales = [
  {
    saleId: 1,
    date: "2022-07-12T13:28:57.000Z",
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: "2022-07-12T13:28:57.000Z",
    productId: 3,
    quantity: 15
  }
]

describe('Ao chamar a camada Model para Sales', () => {

  describe('Insere um novo filme no BD "createSale"', function () {
    const payLoadProduct = [
      {
        productId: 1,
        quantity: 12
      },
      {
        productId: 2,
        quantity: 22
      }
    ]
    before(async function () {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async function () {
      connection.execute.restore();
    });

    describe('quando é inserido com sucesso', function () {
      it('retorna um objeto', async function () {
        const response = await salesService.createSale(payLoadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui o "id" do novo filme inserido', async function () {
        const response = await salesService.createSale(payLoadProduct);

        expect(response).to.have.a.property('id');
      });
    });

  })


  describe('Retorna todos os produtos "getAll"', function () {

    describe('Quando não tem a lista de produtos', function () {
      before(async function () {
        const execute = [[]];

        sinon.stub(connection, 'execute').resolves(execute)
      })

      after(async function () {
        connection.execute.restore()
      })
      it('retorna vazio', async function () {
        const response = await salesService.getAll();

        expect(response).to.be.empty
      })
    })

    describe('Quanto tem os produtos na lista', function () {

      before(async function () {
        sinon.stub(connection, 'execute').resolves([allSales])
      })
      after(async function () {
        connection.execute.restore()
      })

      describe('Busca um produto com sucesso', function () {
        it('retorna um array', async function () {
          const response = await salesService.getAll();

          expect(response).to.be.an('array')
        })

        it('o array não está vazio', async function () {
          const response = await salesService.getAll();


          expect(response).to.be.an('array').that.not.empty
        })

        it('o array tem as propriedades: "id", "name"', async function () {
          const response = await salesService.getAll();

          expect(response).to.deep.equals(allSales)
        })
      })

    })
  })


  describe('Busca apenas um produto no BD pelo ID "getById', function () {

    const id = 1
    const wrongId = 9999

    describe('Quando não existe um  produto com o ID informado', function () {
      before(async function () {
        const execute = [[]];

        sinon.stub(connection, 'execute').resolves([execute])
      })

      after(async function () {
        salesService.getById.restore()
      })

      it('retorna vazio', async function () {

        const response = await salesService.getById(wrongId);

        expect(response).to.have.lengthOf(1);
      })

      describe('Quando existe um produto com o ID informado', function () {
        before(async function () {
          const execute = [
            {
              date: "2022-07-12T11:43:56.000Z",
              productId: 1,
              quantity: 5
            },
            {
              date: "2022-07-12T11:43:56.000Z",
              productId: 2,
              quantity: 10
            }
          ]

          sinon.stub(salesService, 'getById').resolves(execute);
        });

        after(async function () {
          connection.execute.restore();
        });

        describe('Busca um produto com sucesso passando o "ID"', function () {
          it('retorna um array', async function () {
            const response = await salesService.getById(id);

            expect(response).to.be.an('array')
          })

          it('o array não está vazio', async function () {
            const response = await salesService.getById(id);

            expect(response).to.have.lengthOf(2);
          })

          // it('o objeto tem as propriedades: "productId", "quantity", "date"', async function () {
          //   const response = await salesService.getById(id);
          //   const deepKeys = [{ date: 1, productId: 1, quantity: 1 }]
          //   expect(response).to.have.all.deep.keys(deepKeys)
          // })
        })

      })
    })

  });
})