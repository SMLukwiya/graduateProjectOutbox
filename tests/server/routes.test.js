'use strict';

// Testing the routes
import authenticateController from '../../server/controllers/authenticate.controller'
import houseController from '../../server/controllers/house.controller'
import orderController from '../../server/controllers/order.controller'
import userController from '../../server/controllers/user.controller'

//Import the routes to test functionality of the controllers
import authenticateRoutes from '../../server/routes/authenticate.routes'
import houseRoutes from '../../server/routes/house.route'
import orderRoutes from '../../server/routes/order.route'
import userRoutes from '../../server/routes/user.route'

describe('Routes', ()=>{
    var app = {
        get: sinon.spy(),
        post: sinon.spy(),
        delete: sinon.spy()
    };
    beforeEach(()=>{
        routes.initialize(app);
    });//Tests for each route of house
    describe('GETs', ()=>{
        it('should handle /api/buy', ()=>{
            expect(app.get).to.be.calledWith('/api/buy', houseController.listBuy);
        });
        it('should handle /api/buy', ()=>{
            expect(app.get).to.be.calledWith('/api/buy', houseController.listRent);
        });
        it('should handle /api/homepageBuy', ()=>{
            expect(app.get).to.be.calledWith('/api/homepageBuy', houseController.homeBuy);
        });
        it('should handle /api/homepageRent', ()=>{
            expect(app.get).to.be.calledWith('/api/homepageRent', houseController.homeRent);
        });
        it('should handle /api/house/image/:houseId', ()=>{
            expect(app.get).to.be.calledWith('/api/house/image/:houseId', houseController.image);
        });
        it('should handle /api/house/:houseId', ()=>{
            expect(app.get).to.be.calledWith('/api/house/:houseId', houseController.read);
        });
    });
    describe('POSTs', ()=>{
        it('should handle /api/house', ()=>{
            expect(app.post).to.be.calledWith('/api/house', houseController.create);
        });
    });
    });
