The Home Task can be done using Typescript or Vanilla JS.

1. Create abstract superclass called `Shape`, which contains:
    - two protected (if typescript) instance variables: `color` (string) and `filled` (boolean).
    - getter and setter for all the instance variables.
    - overloaded constructor (use multiple constructors declaration for Typescript):
        a no-argument constructor that initializes the color to `"green"` and filled to `true`,
        and a constructor that initializes the `color` and `filled` to the given values.
    - `toString()` method that returns `"A Shape with color of xxx and filled/Not filled"`.
    - abstract `getPerimeter()`.
    
    Please note:
    1. the subclass `Triangle` must override the abstract method `getPerimeter()` and provide the proper implementation. The `toString()` method should be overridden also.
    2. Abstract class means the client can't use it directly, create the instances, or use its abstract methods from the child classes. So abstract class can be inherited only (please read more about abstract classes). You need to emulate abstract class implementation if you use javascript (typescript provides ability to create abstract classes and abstract methods natively).
    
    For example, calling `new Shape()` must throw an error.
    
    ````typescript
    class Triangle extends Shape {}
    const triangle = new Triangle();
    triangle.getPerimeter(); // -> should throw an error
                             // if getPerimeter() is not 
                             // defined in Triangle
    ````

2. Create a `Point` class, which creates 2 dimensional point with coordinates. It should contain:
    - two instance variables `x` and `y`;
    - default constructor which creates a point at the location of (0, 0);
    - overloaded constructor (use multiple constructors declaration for Typescript) which creates a point by `x` and `y` coordinates;
    - getters and setters for `x` and `y`;
    - `toString()` method should return a `Point` class stringified representation in format: `"(x, y)"`;
    - `distance()` method should be overloaded (use multiple methods declaration for Typescript) with next implementations:
      - no args: distance from this point to (0, 0);
      - `distance(other: Point)` - distance from this point to a given instance of `Point`;
      - `distance(x, y)` - distance from this point to a given point (x, y).
    
    Usage:
    
    ````typescript
    const p: Point = new Point(3, 4);
    alert(p); // => "(3, 4)";
    p.distance(); // => ...?
    p.distance(1, 2); // => ...?
    P.distance(new Point(4, 8)); //=> ...?
    ````

3. Create class `Triangle` with 3 vertices, 3 instances of class `Point` must be used as its three vertices. Triangle must inherit `Shape` abstract class. `Triangle` should contain:

    - 3 private instance variables `v1`, `v2`, `v3` (instances of `Point`), for the three vertices;
    - default constructor which creates `Triangle` class with three set of coordinates, v1=(x1, y1), v2=(x2, y2), v3=(x3, y3);
    - overloaded constructor (use multiple constructors declaration for Typescript) which creates `Triangle` class using three instances of `Point` class;
    - override `toString()` method, it should return a `Triangle` class stringified representation in format `"Triangle[v1=(x1,y1),v2=(x2,y2),v3=(x3,y3)]"`;
    - override `getPerimeter()` method, so that it returns the length of the perimeter. You should use the `distance()` method of Point to compute the perimeter;
    - `printType()` method, which prints `"equilateral"` if all the three sides are equal, `"isosceles"` if any two of the three sides are equal, or `"scalene"` if all sides are different.
    
    Using:
    ````typescript
    const t = new Triangle(new Point(1, 2), new Point(3, 7), new Point(5, 2));
    alert(t); // => "Triangle[v1=(1,2),v2=(3,7),v3=(5,2)]";
    t.getPerimeter(); //  => ...? Use Point's .distance() to compute the length of the edges;
    t.printType(); // => "equilateral" or "isosceles" or "scalene"
    ````


