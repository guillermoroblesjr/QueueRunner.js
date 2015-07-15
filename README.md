# QueueRunner.js

Easily force sycronous JavaScript to run asyncronously.

This is great for time-consuming tasks that freeze the UI or any code
that is time-consuming and has to be ran on the same thread as a bunch
of other tasks. 

Here's an example from the console showing code being forced to delay
and be put at the end of the callstack. This allows other code/events
to happen while at the same time still executing your code in order.

![Screenshot](https://raw.githubusercontent.com/guillermoroblesjr/QueueRunner.js/master/running-example.PNG)

# How to use
```js
// create a QueueRunner instance
var queueRunner = new QueueRunner();
// all queue "items" will be created by instantiating a new queue item.
// create a queue item options object to configure your settings.
// this will be passed in to the MakeQueueItem() constructor.
var queueItemOptions = {
  fn: function( queueRunner, num ){
    // continue adding to the queue if you would like
    var num2 = num + 12;
    var queueItem2Options = {
      fn: function( queueRunner, num ){
        console.log( 'queueRunner is: ', queueRunner );
        console.log( 'num is: ', num );
      },
      args: [ queueRunner, num2 ],
      runOnComplete: false,
      waitForEndOfStack: false,
      timeDelay: 1
    };
    // make a queue item
    var queueItem2 = new queueRunner.makeQueueItem( queueItem2Options ); 
    // add it to the queue
    queueRunner.queue.push( queueItem2 );
    // run the queue
    queueRunner.continueQueue();
  },
  args: [ queueRunner, 11 ],
  runOnComplete: false,
  waitForEndOfStack: false,
  timeDelay: 800
};
// make a queue item
var queueItem = new queueRunner.MakeQueueItem( queueItemOptions ); 
// add it to the queue
queueRunner.queue.push( queueItem );
// run the queue
queueRunner.run();
```