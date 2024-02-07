//products.test.js
import mongoose from 'mongoose'
import Product from '../DAO/mongo/products.mongo.js'
import Assert from 'assert'
import * as Chai from 'chai'
import Supertest from 'supertest'
import config from '../config/factory.config.js' 

mongoose.connect(config.mongo_url);

const assert = Assert.strict
const expect = Chai.expect
const requester = Supertest("http://localhost:8080")

describe('Testing Product DAO Mocha/Chai/SuperTest', () => {
    before(function () {
        this.productsDao = new Product()
    })
    it("Debería devolver los productos de la DB", async function () {
        this.timeout(2000)
        try
        {
            const result = await this.productsDao.get()
            assert.strictEqual(Array.isArray(result), true) //Mocha
            expect(Array.isArray(result)).to.be.equals(true) //Chai
        }
        catch(error)
        {
            console.error("Error durante el test: ", error)
            assert.fail("Test get producto con error")
        }
    })
    it("El DAO debe agregar un producto en la DB", async function () {
        let mockProduct = {
            description: "Test Description",
            image: "Test Image",
            price: 1234,
            stock: 10,
            availability: "in_stock",
            owner: "Test Owner"
        }
        const result = await this.productsDao.addProduct(mockProduct)
        assert.ok(result._id) //Mocha
        expect(result).to.have.property('_id') //Chai
    })
    it("El DAO debe actualizar un producto", async function () {
        let prodId = "658c80e01bd5baba0dcf0c83"
        let mockProductUpd = {
            description: "Test Desc Upd",
            image: "Test Image Upd",
            price: 1234,
            stock: 10,
            availability: "Test Availability Upd",
            owner: "Test Owner Upd"
        }
        const result = await this.productsDao.updateProduct(prodId, mockProductUpd )
        assert.strictEqual(typeof result, "object") //Mocha
        expect(result).to.be.an('object') //Chai
    })
    it("El DAO debe eliminar un producto", async function () {
        let prodId = "658c8605c6c665c47493c743" 
        const result = await this.productsDao.deleteProduct(prodId)
        assert.strictEqual(typeof result, "object") //Mocha
        expect(result).to.be.an('object') //Chai
    })

    it("El endpoint GET /products debe devolver todos los productos", async function() {
        const response = await requester.get('/products')

        assert.strictEqual(response.status, 200);

        expect(response.type).to.equal('application/json');

        expect(response.body).to.have.property('status', 'success');
    })
    it("El endpoint POST /products debe crear un producto", async function() {
        let mockProduct = {
            description: "Test POST",
            image: "Test POST",
            price: 1234,
            stock: 10,
            availability: "in_stock",
            owner: "soliskarem@gmail.com"
        }
        
        const response = await requester.post('/products').send(mockProduct)

        assert.strictEqual(response.status, 200);

        expect(response.ok).to.equal(true);

        expect(response.body).to.have.property('status', 'success');
    })
    after(function(done) {
        this.timeout(2000);
        console.log("Fin de las pruebas de Producto");
        done();
    });
})
