
import mongoose from 'mongoose';
import Order from '../DAO/mongo/orders.mongo.js';
import Assert from 'assert';
import * as Chai from 'chai';
import Supertest from 'supertest';
import config from '../config/factory.config.js';

mongoose.connect(config.mongo_url);

const assert = Assert.strict;
const expect = Chai.expect;
const requester = Supertest("http://localhost:8080");

describe('Testing Order DAO Mocha/Chai/SuperTest', () => {
    before(function () {
        this.ordersDao = new Order();
    });

    it("Debería devolver las ordenes de la base de datos", async function () {
        this.timeout(5000);
        try {
            const result = await this.ordersDao.get();
            assert.strictEqual(Array.isArray(result), true); // Mocha
            expect(Array.isArray(result)).to.be.equals(true); // Chai
        } catch (error) {
            assert.fail("Test get usuario con error");
        }
    });

    it("El DAO debe agregar la orden a la base de datos", async function () {
        let mockOrder = {
            amount: 1234,
            purchaser: "soliskarem@gmail.com",
            code: "uniqueCode" + Date.now()
        };
        const result = await this.ordersDao.addOrder(mockOrder);
        
        if (result.error) {

            assert.fail(result.error);
        } else {

            assert.ok(result._id); // Mocha
            expect(result).to.have.property('_id'); // Chai
        }
    }); 
    


    it("El endpoint GET /orders debe devolver todas las ordenes", async function() {
        const response = await requester.get('/orders');

        assert.strictEqual(response.status, 200);

        expect(response.type).to.equal('application/json');

        expect(response.body).to.have.property('status', 'success');
    });

    it("El endpoint POST /orders debe crear uan orden", async function() {
        let mockOrder = {
            amount: 1234,
            purchaser: "soliskarem@gmail.com",
        };
        
        const response = await requester.post('/orders').send(mockOrder);

        assert.strictEqual(response.status, 200);

        expect(response.ok).to.equal(true);

        expect(response.body).to.have.property('status', 'success');
    });

    after(function(done) {
        this.timeout(2000);
        console.log("Fin de las pruebas de Ordenes");
        done();
    });
});