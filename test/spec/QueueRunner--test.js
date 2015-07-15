/* global describe, it */
// jshint ignore: start

(function () {

  'use strict';
  
  describe("Creating a queue with QueueRunner.js", function() {

    describe("creating an instance of QueueRunner", function(){
      it('should be an instance of QueueRunner', function(){
        var q = new QueueRunner();
        expect(q).to.be.instanceof(QueueRunner);
      });
    });

    /* 
    describe('creating a class with make()', function(){

      it('should return a function', function(){
        var SomeClass = Class.make(function SomeClass(){
        });
        expect(SomeClass).to.be.a('function');
      });
    });

    describe('creating an instance of your new class', function(){
      
      describe('-- creating an instance with the "new" operator', function(){
        it('should be an instance of the class made', function(){
          var SomeClass = Class.make(function SomeClass(){
          });
          var classInstance = new SomeClass();
          expect(classInstance).to.be.instanceof(SomeClass);
        });
      });

      describe('-- creating an instance with Object.create()', function(){
        it('should be an instance of the class made', function(){
          var SomeClass = Class.make(function SomeClass(){
          });
          var classInstance = Object.create(SomeClass.prototype);
          expect(classInstance).to.be.instanceof(SomeClass);
        });
      });

      describe('-- instantiating with "new"', function(){

        it('should inherit all properties from it\'s constructor', function(){
          var SomeClass = Class.make(function SomeClass(){
            this.property1 = true;
            return this;
          });
          var someInstance = new SomeClass();
          expect(someInstance).to.have.property('property1');
          expect(someInstance.property1).to.not.be.a('function');
        });

        it('should inherit all methods from it\'s constructor', function(){
          var SomeClass = Class.make(function SomeClass(){
            this.method1 = function(){};
            return this;
          });
          var someInstance = new SomeClass();
          expect(someInstance).to.have.property('method1');
          expect(someInstance.method1).to.be.a('function');
        });

        it('inherits properties which is not it\'s own', function(){
          var SomeClass = Class.make(function SomeClass(){
            this.property1 = true;
            return this;
          });
          var someInstance = new SomeClass();
          expect(someInstance).to.have.property('property1');
          expect(someInstance).to.not.have.ownProperty('property1');
        });

        it('inherits methods which is not it\'s own', function(){
          var SomeClass = Class.make(function SomeClass(){
            this.method1 = function(){};
            return this;
          });
          var someInstance = new SomeClass();
          expect(someInstance).to.have.property('method1');
          expect(someInstance).to.not.have.ownProperty('method1');
        });

        it('can inherit properties via prototype', function(){
          var SomeClass = Class.make(function SomeClass(){
            return this;
          });
          SomeClass.prototype.property1 = true;
          var someInstance = new SomeClass();
          expect(someInstance).to.have.property('property1');
          expect(someInstance).to.not.have.ownProperty('property1');
        });

        it('can inherit methods via prototype', function(){
          var SomeClass = Class.make(function SomeClass(){
            return this;
          });
          SomeClass.prototype.method1 = function(){};
          var someInstance = new SomeClass();
          expect(someInstance).to.have.property('method1');
          expect(someInstance).to.not.have.ownProperty('method1');
        });

        it('can inherit properties via prototype after instantiated', function(){
          var SomeClass = Class.make(function SomeClass(){
            return this;
          });
          var someInstance = new SomeClass();
          SomeClass.prototype.property1 = true;
          expect(someInstance).to.have.property('property1');
          expect(someInstance).to.not.have.ownProperty('property1');
        });

        it('can inherit methods via prototype after instantiated', function(){
          var SomeClass = Class.make(function SomeClass(){
            return this;
          });
          var someInstance = new SomeClass();
          SomeClass.prototype.method1 = function(){};
          expect(someInstance).to.have.property('method1');
          expect(someInstance).to.not.have.ownProperty('method1');
        });
      });
    });

    //*/

  });

})();
