export interface ExampleStateInterface {
  testProp: boolean;
}

function state (): ExampleStateInterface {
  return {
    testProp: false
  }
}

export default state
