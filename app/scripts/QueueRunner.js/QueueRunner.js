// https://github.com/guillermoroblesjr/QueueRunner.js
(function(window, undefined){

  var QueueRunner = function(){
    'use strict';
    this.queue = [
      // { fn: function(){}, args: [], runOnComplete: false }
    ];
  };

  // subclass extends superclass
  QueueRunner.prototype = Object.create( Object.prototype );
  // set the constructor back to QueueRunner
  QueueRunner.prototype.constructor = QueueRunner;

  QueueRunner.VERSION = 'v0.0.4-alpha';

  QueueRunner.prototype.ids = {
    item: 0
  };

  var MakeQueueItem = QueueRunner.prototype.MakeQueueItem = function( itemOptions ){
    this.fn = itemOptions.fn || function(){ 
      return console.error('All queue item objects created with makeQueueItem(), need a function for the "fn" key!', 
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
    
    this._id = this.generateId('item');
    return this;
  };
  MakeQueueItem.prototype = Object.create( QueueRunner.prototype );
  MakeQueueItem.prototype.constructor = MakeQueueItem;

  var generateId = QueueRunner.prototype.generateId = function( type ){
    var id = ++this.ids[type];
    return id;
  };
  generateId.prototype = Object.create( QueueRunner.prototype );
  generateId.prototype.constructor = generateId;

  QueueRunner.prototype.waitAndDelay = function( item ){
    var self = this;
    var runItemFn = function( args ){
      item.fn.apply( self, item.args );
    };
    return this.delay( runItemFn, item.timeDelay, item.args );
  };
  QueueRunner.prototype.run = function(){
    var self = this;
    // stop if the queue is zero
    if ( this.queue.length === 0 ) { 
      // console.log('the queue length is: ', this.queue.length);
      return; 
    };
    // remove the first item in the queue
    var item = this.queue.shift();
    
    if ( item.waitForEndOfStack === true && item.timeDelay !== undefined ) {
      // run function at end of stack and after a time delay
      this.waitAndDelay( item );
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
  QueueRunner.prototype.continueQueue = QueueRunner.prototype.run;
  QueueRunner.prototype.delay = function( func, wait, args ){
    var self = this;
    return setTimeout(function() { func.apply(self, args); }, wait);
  };

  // attach to the window
  window.QueueRunner = QueueRunner;

  return QueueRunner;

})(window);
