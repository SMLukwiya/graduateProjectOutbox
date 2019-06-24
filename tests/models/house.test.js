'use strict';

// test for house model
import HouseModel from '../../models/house.models'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

describe('House Model', function() {
    var house;

    beforeEach(function(){
        house = new HouseModel({
            image: 'Buffer',
            name: 'test tester house',
            about: 'This is about Test Tester',
            price: '$ 20000',
            catergory: 'For Sale',
            bedrooms: '5',
            garage: '2',
            location: 'plot 2019, rich lane, no broke street',
            created: 'sunday 14th jan',
            updated: 'sunday 14th jan'
        });
    });

    it('should have a mongoose schema', function(){
        expect(HouseModel.schema).to.be.defined;
    });

    describe('Schema', function() {
        it('should have an image', function(){
            expect(house.image).to.be.defined;
        });
        it('should have a email string', function(){
            expect(house.name).to.be.defined;
        });
        it('should have a name string', function(){
            expect(house.about).to.be.defined;
        });
        it('should have a gravatar string', function(){
            expect(house.price).to.be.defined;
        });
        it('should have a comment string', function(){
            expect(house.catergory).to.be.defined;
        });
        it('should have a timestamp date', function(){
            expect(house.bedrooms).to.be.defined;
        });
        it('should have a timestamp date', function(){
            expect(house.garage).to.be.defined;
        });
        it('should have a timestamp date', function(){
            expect(house.location).to.be.defined;
        });
        it('should have a timestamp date', function(){
            expect(house.created).to.be.defined;
        });
        it('should have a timestamp date', function(){
            expect(house.updated).to.be.defined;
        });
    });

});
