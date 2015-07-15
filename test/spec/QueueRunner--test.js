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

      it('should have the "queue" property', function(){
        var q = new QueueRunner();
        expect(q).to.have.property('queue');
        expect(q).to.have.ownProperty('queue');
      });

      it('should inherit the "MakeQueueItem" method via prototype', function(){
        var q = new QueueRunner();
        expect(q).to.have.property('MakeQueueItem');
        expect(q).to.not.have.ownProperty('MakeQueueItem');
      });

      it('should inherit the "run" method via prototype', function(){
        var q = new QueueRunner();
        expect(q).to.have.property('run');
        expect(q).to.not.have.ownProperty('run');
      });

      it('should inherit the "continueQueue" method via prototype', function(){
        var q = new QueueRunner();
        expect(q).to.have.property('continueQueue');
        expect(q).to.not.have.ownProperty('continueQueue');
      });

      it('should inherit the "delay" method via prototype', function(){
        var q = new QueueRunner();
        expect(q).to.have.property('delay');
        expect(q).to.not.have.ownProperty('delay');
      });
    });

    describe("making a queue item with QueueRunner.prototype.MakeQueueItem()", function(){
      it('should return an object', function(){
        var q = new QueueRunner();
        var queueItem = q.MakeQueueItem({});
        expect(queueItem).to.be.a('object');
      });

      it('should have a property fn', function(){
        var q = new QueueRunner();
        var queueItem = q.MakeQueueItem({});
        expect(q).to.have.property('fn');
        expect(q.fn).to.be.a('function');
      });

      it('should have a property args', function(){
        var q = new QueueRunner();
        var queueItem = q.MakeQueueItem({});
        expect(q).to.have.property('args');
        expect(q.args).to.be.a('array');
      });

      it('should have a property runOnComplete', function(){
        var q = new QueueRunner();
        var queueItem = q.MakeQueueItem({});
        expect(q).to.have.property('runOnComplete');
        expect(q.runOnComplete).to.be.a('boolean');
      });

      it('should have a property waitForEndOfStack', function(){
        var q = new QueueRunner();
        var queueItem = q.MakeQueueItem({});
        expect(q).to.have.property('waitForEndOfStack');
        expect(q.waitForEndOfStack).to.be.a('boolean');
      });

      it('should have a property timeDelay', function(){
        var q = new QueueRunner();
        var queueItem = q.MakeQueueItem({});
        expect(q).to.have.property('timeDelay');
        expect(q.timeDelay).to.satisfy(function(val) { 
          return ( typeof val === 'number' || typeof val === 'undefined' ); 
        });
      });
    });

    describe("implementing the queue runner", function(){
      it("should have an initial queue size of zero", function(){
        var q = new QueueRunner();
        expect(q.queue.length).to.equal(0);
      });

      it("should reduce the queue size by removing the first item in it", function(){

        var q = new QueueRunner();
        var queueItemOptions = {
          fn: function(){},
          args: [ q ],
          runOnComplete: false,
          waitForEndOfStack: false,
          timeDelay: 1
        };

        var queueItem = new q.MakeQueueItem( queueItemOptions );
        q.queue.push( queueItem );
        q.run();

        expect(q.queue.length).to.equal(0);
      });

      it("should not throw an error if run() is called with no items in the queue ", function(){

        var q = new QueueRunner();
        q.run();
        expect(q.run).to.not.throw(ReferenceError);
      });

      it("continueQueue() should be the same as run()", function(){
        var q = new QueueRunner();
        expect(q.continueQueue).to.equal(q.run);
      });

      describe("if the queue item does not have a user defined function", function(){
        it("should write an error to the console", function(){

          var q = new QueueRunner();
          var queueItem = new q.MakeQueueItem({});
          q.queue.push( queueItem );
          expect(q.queue.length).to.equal(0);
        });
      });



      /*
        it("apples", function(){

          var q = new QueueRunner();
          var queueItemOptions = {
            fn: function(){},
            args: [ q ],
            runOnComplete: false,
            waitForEndOfStack: false,
            timeDelay: 1
          };

          var queueItem = new q.MakeQueueItem( queueItemOptions );
          q.queue.push( queueItem );
          q.run();

          expect(q.queue.length).to.equal(0);
        });
      //*/
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
