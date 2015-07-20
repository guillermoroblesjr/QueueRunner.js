// Example Usage
// jshint ignore: start
(function(window, undefined){
  
  'use strict';

  var example1 = function(){
    
    var queueRunner1 = new QueueRunner();
    var fn = function( count, fn, dbug ){

      var timeDelay = parseInt( Math.random() * 1000 * 2 );

      console.groupCollapsed('Example1');

      dbug.time( 'Example 1, time diff from last ran function in queue: ' );
      console.log( 'Example 1', 
        '\n',
        'count is: ', count, 
        '\n',
        'timeDelay before next function is ran: ', timeDelay, 'ms' 
      );
      
      count++;

      var dbug = new Dbug();
      dbug.time( 'Example 1, time diff from last ran function in queue: ' );

      var doSomthingTimeConsuming = function(){

        var count = parseInt( Math.random() * 10000000000 );
        for (var i = 0; i < count; i++) {
          // blah.
        };
      };

      dbug.time( 'time consuming task' );
      doSomthingTimeConsuming();
      dbug.time( 'time consuming task' );

      console.groupEnd('Example1');

      var itemOptions = {
        fn: fn,
        args: [ count, fn, dbug ],
        runOnComplete: false,
        waitForEndOfStack: false,
        timeDelay: timeDelay
      };
      
      if ( count <= 10 ) {
        queueRunner1.queue.push( new queueRunner1.MakeQueueItem( itemOptions ) );
      };

      // continue the next item on the queue
      this.continueQueue();
    };
    var count = 0;
    var dbug = new Dbug();
    var itemOptions = {
      fn: fn,
      args: [ count, fn, dbug ],
      runOnComplete: false,
      waitForEndOfStack: false,
      timeDelay: 800
    };

    dbug.time( 'Example 1, time diff from last ran function in queue: ' );

    queueRunner1.queue.push( new queueRunner1.MakeQueueItem( itemOptions ) );
    queueRunner1.run();
  };

  example1();
  // --------------------------------------------------------
  
  var example2 = function(){
    
    var queueRunner2 = new QueueRunner();
    var fn = function( count, fn, dbug ){

      var timeDelay = parseInt( Math.random() * 1000 * 2 );

      console.groupCollapsed('Example2');

      dbug.time( 'Example 2, time diff from last ran function in queue: ' );
      console.log( 'Example 2', 
        '\n',
        'count is: ', count, 
        '\n',
        'timeDelay before next function is ran: ', timeDelay, 'ms' 
      );
      
      count++;

      var dbug = new Dbug();
      dbug.time( 'Example 2, time diff from last ran function in queue: ' );

      console.groupEnd('Example2');

      var itemOptions = {
        fn: fn,
        args: [ count, fn, dbug ],
        runOnComplete: false,
        waitForEndOfStack: false,
        timeDelay: timeDelay
      };
      
      if ( count <= 10 ) {
        queueRunner2.queue.push( new queueRunner2.MakeQueueItem( itemOptions ) );
      };

      // continue the next item on the queue
      this.continueQueue();
    };
    var count = 0;
    var dbug = new Dbug();
    var itemOptions = {
      fn: fn,
      args: [ count, fn, dbug ],
      runOnComplete: false,
      waitForEndOfStack: false,
      timeDelay: 800
    };

    dbug.time( 'Example 2, time diff from last ran function in queue: ' );

    queueRunner2.queue.push( new queueRunner2.MakeQueueItem( itemOptions ) );
    queueRunner2.run();
  };

  example2();

})(window);



