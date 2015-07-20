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

      it('should inherit the "generateId" method via prototype', function(){
        var q = new QueueRunner();
        expect(q).to.have.property('generateId');
        expect(q).to.not.have.ownProperty('generateId');
      });
    });

    describe("making a queue item with MakeQueueItem()", function(){
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

      it('should have a property _id', function(){
        var q = new QueueRunner();
        var queueItem = q.MakeQueueItem({});
        expect(q).to.have.property('_id');
        expect(q._id).to.be.a('number');
      });
    });

    describe("user options", function(){

      it("should write an error to the console", function(){

        var q = new QueueRunner();

        // mock console.error
        var c = {
          error: function(){
            return true;
          }
        };
        q.MakeQueueItem = function( itemOptions ){
          this.fn = itemOptions.fn || function(){ 
            return c.error('All queue item objects created with makeQueueItem(), need a function for the "fn" key!', 
              '\n',
              'The current instance running is: ', this,
              '\n',
              'Arguments passed in are: ', arguments
            );
          };
          this.args = itemOptions.args || [];
          this.runOnComplete = itemOptions.runOnComplete || false;
          this.waitForEndOfStack = itemOptions.waitForEndOfStack || false;
          this.timeDelay = itemOptions.timeDelay || undefined;
          return this;
        };

        // run test
        var queueItem = new q.MakeQueueItem( {} );
        var fn = queueItem.fn.apply( q, queueItem.args );
        expect(fn).to.equal(true);

        // run it the way it would be done normally
        q = new QueueRunner();
        queueItem = new q.MakeQueueItem( {} );
        q.queue.push( queueItem );
        q.run();
      });

      it("run function at end of stack and after a time delay", function(){

        var q = new QueueRunner();
        var queueItemOptions = {
          fn: function(){},
          args: [ q ],
          runOnComplete: false,
          waitForEndOfStack: true,
          timeDelay: 1
        };

        var queueItem = new q.MakeQueueItem( queueItemOptions );
        q.queue.push( queueItem );
        q.run();

        expect(q.queue.length).to.equal(0);
      });

      it("run function at end of stack", function(){

        var q = new QueueRunner();
        var queueItemOptions = {
          fn: function(){},
          args: [ q ],
          runOnComplete: false,
          waitForEndOfStack: true
        };

        var queueItem = new q.MakeQueueItem( queueItemOptions );
        q.queue.push( queueItem );
        q.run();

        expect(q.queue.length).to.equal(0);
      });

      it("run function with a time delay", function(){

        var q = new QueueRunner();
        var queueItemOptions = {
          fn: function(){},
          args: [ q ],
          timeDelay: 100
        };

        var queueItem = new q.MakeQueueItem( queueItemOptions );
        q.queue.push( queueItem );
        q.run();

        expect(q.queue.length).to.equal(0);
      });

      it('run a queue item with a minimum delay of what is specified in the time delay', function(done) {
        var q = new QueueRunner();
        var timeDelay = parseInt(Math.random() * 1000 * 2);
        var queueItemOptions = {
          fn: function(timeDelay, t1){
            var t2 = new Date();
            expect( t2 - t1 ).to.be.at.least( timeDelay );
            done();
          },
          args: [ timeDelay, new Date() ],
          runOnComplete: false,
          waitForEndOfStack: false,
          timeDelay: timeDelay
        };

        var queueItem = new q.MakeQueueItem( queueItemOptions );
        q.queue.push( queueItem );
        q.run();
      });

      it("run function with only a fn", function(){

        var q = new QueueRunner();
        var queueItemOptions = {
          fn: function(){}
        };

        var queueItem = new q.MakeQueueItem( queueItemOptions );
        q.queue.push( queueItem );
        q.run();

        expect(q.queue.length).to.equal(0);
      });

      it("run function with only a fn and args", function(){

        var q = new QueueRunner();
        var queueItemOptions = {
          fn: function(){},
          args: []
        };

        var queueItem = new q.MakeQueueItem( queueItemOptions );
        q.queue.push( queueItem );
        q.run();

        expect(q.queue.length).to.equal(0);
      });

      it("continue running queue if user requested", function(){

        var q = new QueueRunner();
        var timeDelay = parseInt(Math.random() * 1000 * 2);
        var queueItemOptions = {
          fn: function(q){
          },
          args: [ q ],
          runOnComplete: true,
          timeDelay: timeDelay
        };

        var queueItem = new q.MakeQueueItem( queueItemOptions );
        q.queue.push( queueItem );

        var queueItemOptions2 = {
          fn: function(q){
            expect( q.queue.length ).to.equal( 0 );
            // done();
          },
          args: [q]
        };
        var queueItem2 = new q.MakeQueueItem( queueItemOptions2 );
        q.queue.push( queueItem2 );

        q.run();
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
        queueItem.id = 1;
        q.queue.push( queueItem );

        queueItem = new q.MakeQueueItem( queueItemOptions );
        queueItem.id = 2;
        q.queue.push( queueItem );

        q.run();

        expect(q.queue[0].id).to.equal(2);
      });

      it('the fn property "this" will be the current QueueRunner instance', function(done) {
        var q = new QueueRunner();
        var queueItemOptions = {
          fn: function(q){
            expect( this ).to.equal( q );
            done();
          },
          args: [q]
        };

        var queueItem = new q.MakeQueueItem( queueItemOptions );
        q.queue.push( queueItem );
        q.run();
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

      it("generateId() will always generate a unique id", function(){
        var q = new QueueRunner();
        var id1 = q.generateId('item');
        var id2 = q.generateId('item');

        expect(id1).to.not.equal(id2);
      });

      it("multiple queue items to have different id's", function(){
        var q = new QueueRunner();
        var queueItem = new q.MakeQueueItem( {} );
        var queueItem2 = new q.MakeQueueItem( {} );
        var id1 = queueItem._id;
        var id2 = queueItem2._id;

        expect(id1).to.not.equal(id2);
      });

      it("generateId() to always generate a unique id incremented by 1", function(){
        var q = new QueueRunner();
        var id1 = q.generateId('item');
        var id2 = q.generateId('item');

        expect( id2 ).to.equal( id1 + 1 );
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

  });

})();
