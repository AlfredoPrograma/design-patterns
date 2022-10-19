// DUCK Example

// BEHAVIORS INTERFACES
interface FlyInterface {
  fly: () => void;
}

interface QuackInterface {
  quack: () => void;
}

// All ducks will have these properties and methods
// This is the base Duck class from which all others will inherit
class Duck {
  // STAY PART:
  // Has 3 common properties and 1 common method through all ducks
  // properties: hitpoints, velocity, name
  // method: display()

  // VARY PART:
  // Has 2 possible behaviors which could change each new Duck implementation
  // flyBehavior, quackBehavior

  constructor(
    public hitpoints: number,
    public velocity: number,
    public name: string,
    protected flyBehavior: FlyInterface = new NormalFly(),
    protected quackBehavior: QuackInterface = new NormalQuack()
  ) {}

  // Common display method for all ducks
  public display() {
    console.log(`Duck ${this.name}: ${this.hitpoints}, ${this.velocity}`);
  }

  // Exposes setters in order to allow to change behaviors at runtime
  public setFlyBehavior(flyBehavior: FlyInterface) {
    this.flyBehavior = flyBehavior;
  }

  public setQuackBehavior(quackBehavior: QuackInterface) {
    this.quackBehavior = quackBehavior;
  }

  // Polymorphic methods which execute the CORRESPONDENT BEHAVIOR method
  public performFly() {
    this.flyBehavior.fly();
  }

  public performQuack() {
    this.quackBehavior.quack();
  }
}

// Fly behavior classes implementations
class NormalFly implements FlyInterface {
  public fly() {
    console.log("Im flying with my normal wings");
  }
}

class RocketFly implements FlyInterface {
  public fly() {
    console.log("FLYING WITH A FUCKING ROCKET");
  }
}

class NoFly implements FlyInterface {
  public fly() {
    console.log("AAAAhhh, I cant fly lol");
  }
}

// Quack behavior classes implementations
class NormalQuack implements QuackInterface {
  public quack() {
    console.log("Quack normal");
  }
}

class LoudQuack implements QuackInterface {
  public quack() {
    console.log("LOUD QUACK!!!");
  }
}

// Concrete ducks with their own particular behaviors
class MallardDuck extends Duck {
  constructor(
    hitpoints: number,
    velocity: number,
    name: string,
    flyBehavior?: FlyInterface,
    quackBehavior?: QuackInterface
  ) {
    super(hitpoints, velocity, name, flyBehavior, quackBehavior);
  }
}

// Instantiation of MallardDuck class with default behaviors provided by BaseClass
const defaultMallardDuck = new MallardDuck(100, 12, "Default");

defaultMallardDuck.display();
defaultMallardDuck.performFly();
defaultMallardDuck.performQuack();

// Instantiation of MallardDuck class with custom behaviors
const customMallardDuck = new MallardDuck(
  110,
  12,
  "Custom",
  new RocketFly(),
  new LoudQuack()
);

customMallardDuck.display();
customMallardDuck.performFly();
customMallardDuck.performQuack();

// Can change custom behavior at runtime by setters
customMallardDuck.setFlyBehavior(new NoFly());
customMallardDuck.performFly();
