# QueueRunner.js

Easily force syncronous JavaScript tasks to run asyncronously, or, 
run asyncronous tasks in order without entering callback hell.

This is great for time-consuming tasks that freeze the UI or any code
that is time-consuming and has to be ran on the same thread as a bunch
of other tasks.

It is also great for creating order with callbacks in asycronous code.

## How it works

The queue is nothing more than an array of objects. Each object contains
the function to be ran, it's arguments, and options on how to run the
function. 

Since the queue is an array, it can be changed dynamically. Easily add or 
remove items to the queue. The QueueRunner doesn't care what's next or last, 
it just shifts the first item out of the array, runs the function with the
arguments and obeys your options. 

Every function ran in the queue will have ```this``` point to the QueueRunner instance.
Either run the next function in the queue using this.continueQueue() within
your current function or when you create a queue item set the ```runOnComplete```
options to ```true``` to have it ran automatically for you.

## Example

Here's an example from the console showing code being forced to delay
and be put at the end of the callstack. This allows other code/events
to happen while at the same time still executing your code in order.

![Screenshot](https://raw.githubusercontent.com/guillermoroblesjr/QueueRunner.js/master/running-example.PNG)

## How to use

First create a QueueRunner instance, 
```js
var queueRunner = new QueueRunner();
```

All queue items will need to be created by instantiating a new queue item. This is 
done by using QueueRunner MakeQueueItem() constructor. You will pass in an object 
with all your options (if any) and with the mandatory function that will be ran in
the queue.
```js
var options = {
  fn: function(){
    console.log('hello!');
  },
  args: [],
  runOnComplete: false,
  waitForEndOfStack: false,
  timeDelay: 1
};
// make a queue item
var queueItem = new queueRunner.MakeQueueItem( options ); 
```

You can make as many queue items as you'll need or make more later. You can
add them dynamically to the queue. Add a queue item by pushing it into the
queue array.
```js
// add it to the queue
queueRunner.queue.push( queueItem );
```

Once the queue runner has items in the queue it's ready to run them. Start
running it by using the ```run``` method.
```js
// run the queue
queueRunner.run();
```

## Example of passing in arguments & dynamically adding to the queue
```js
// create a QueueRunner instance
var queueRunner = new QueueRunner();
// all queue "items" will be created by instantiating a new queue item.
// create a queue item options object to configure your settings.
// the queue item function's "this" will be the queue runner instance.
var queueItemOptions = {
  fn: function( num ){
    // continue adding to the queue if you would like
    var num2 = num + 12;
    var queueItem2Options = {
      fn: function( num ){
        console.log( 'this is: ', this );
        console.log( 'num is: ', num );
      },
      args: [ num2 ],
      runOnComplete: false,
      waitForEndOfStack: false,
      timeDelay: 1
    };
    // make a queue item
    var queueItem2 = new this.MakeQueueItem( queueItem2Options ); 
    // add it to the queue
    this.queue.push( queueItem2 );
    // run the queue
    this.continueQueue();
  },
  args: [ 11 ],
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

## API

### Making a queue item
```js
new QueueRunner.MakeQueueItem({
  fn: function(){},         // function: the function to be ran in the queue
  args: [],                 // array: arguments to be passed in to fn
  runOnComplete: false,     // boolean: run the next function automatically after fn finishes
  waitForEndOfStack: false, // boolean: wait until the end of the stack before running fn
  timeDelay: 1              // boolean: wait this amount of time before running fn
}); 
```

### Continue running the queue
Within fn
```js
this.continueQueue();
```

Outside of fn
```js
{ runOnComplete: true }
```
