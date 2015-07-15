// https://github.com/guillermoroblesjr/QueueRunner.js
var QueueRunner = function(){
  'use strict';
  this.queue = [
    // { fn: function(){}, args: [], runOnComplete: false }
  ];
  this.makeQueueItem = function( itemOptions ){
    this.fn = itemOptions.fn || function(){ 
      console.error('All queue item objects created with makeQueueItem(), need a function for the "fn" key!', 
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
  this.run = function(){
    var self = this;
    // stop if the queue is zero
    if ( this.queue.length === 0 ) { 
      console.log('the queue length is: ', this.queue.length);
      return; 
    };
    // remove the first item in the queue
    var item = this.queue.shift();
    
    if ( item.waitForEndOfStack === true && item.timeDelay !== undefined ) {
      // run function at end of stack and after a time delay
      this.delay( function( args ){
        
        self.delay( function( args ){

          item.fn.apply( self, item.args );

        }, item.timeDelay, item.args)

      }, 1, item.args );
    }
    else if ( item.waitForEndOfStack === true ){
      // run function at end of stack
      this.delay( item.fn, 1, item.args );
    }
    else if ( item.timeDelay !== undefined ){
      // run function at end of timeDelay
      this.delay( item.fn, item.timeDelay, item.args );
    }
    else {
      // run the function
      item.fn.apply( this, item.args );
    }
    // continue running on queue if user requested
    if ( item.runOnComplete === true ) {
      this.run();
    };
  };
  this.continueQueue = function(){
    this.run();
  };
  this.delay = function( func, wait, args ){
    args = args || [];
    wait = wait || 1;
    return setTimeout(function() { func.apply(undefined, args); }, wait);
  };
};