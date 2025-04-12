const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { createActor } = require('xstate');
const { machine } = require('../../src/roboticAssistant'); // Adjust the path as needed

let service;

Before(() => {
  service = createActor(machine);
  service.start();
});

Given('the robotic assistant is powered on', () => {
  if (service.getSnapshot().value !== 'idle') {
    throw new Error('Robot should be in idle state');
  }
});

When('the warehouse map is loaded', () => {
  service.send({ type: 'load_map' });
  if (service.getSnapshot().value !== 'mapLoaded') {
    throw new Error('Robot should be in mapLoaded state');
  }
});

When('the robot is commanded to navigate to bin {string}', function (binLocation) {
  console.log(`Navigating to bin ${binLocation}`);
  service.send({ type: 'navigate', location: binLocation });
  if (service.getSnapshot().value !== 'navigating') {
    throw new Error('Robot should be in navigating state');
  }
});

When('the robot arrives at the bin location', () => {
  service.send({ type: 'arrived', location: 'A7' });
  if (service.getSnapshot().value !== 'atLocation') {
    throw new Error('Robot should be atLocation state');
  }
});

Then('the robot should be at the specified location', () => {
  if (service.getSnapshot().value !== 'atLocation') {
    throw new Error('Robot should be atLocation state');
  }
});
