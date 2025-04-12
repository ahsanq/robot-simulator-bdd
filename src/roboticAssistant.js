const { createMachine } = require('xstate');

const machine = createMachine({
  context: {
    status: 'Idle',
    location: null
  },
  id: 'roboticAssistant',
  initial: 'idle',
  states: {
    idle: {
      description: 'The robotic assistant is powered on and waiting for a command.',
      on: {
        load_map: 'mapLoaded'
      }
    },
    mapLoaded: {
      description: 'The warehouse map is loaded and the robot is ready to receive navigation commands.',
      on: {
        navigate: 'navigating'
      }
    },
    navigating: {
      description: 'The robot is moving towards the specified bin location.',
      on: {
        arrived: 'atLocation'
      }
    },
    atLocation: {
      description: 'The robot has reached the specified bin location and updates its status.',
      type: 'final'
    }
  }
}, {
  actions: {
    'load_map': (context, event) => {
      console.log('Warehouse map loaded');
    },
    'navigate': (context, event) => {
      console.log(`Navigating to bin location ${event.location}`);
    },
    'arrived': (context, event) => {
      console.log(`Arrived at bin location ${event.location}`);
    }
  }
});

module.exports = { machine };
